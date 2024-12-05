<?php

namespace App\Features\Auth\Fortify;

use App\Features\Auth\SendSmsVerificationCode;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;
use Propaganistas\LaravelPhone\PhoneNumber;

class UpdateUserProfileInformation implements UpdatesUserProfileInformation
{
    /**
     * Validate and update the given user's profile information.
     *
     * @param  array<string, string>  $input
     */
    public function update(User $user, array $input): void
    {
        $inputPhoneNumber = &$input['phone_number'] ?? null;

        // Transform to a normalized format, unique rule may fail if there is a space between the numbers
        $inputPhoneNumber = PhoneNumber::toFormatE164($input['phone_number'] ?? null);

        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'phone_number' => [
                'required',
                'phone:mobile',
                Rule::unique(User::class)->ignore($user->id),
            ],
        ],
            [
                'phone' => 'The :attribute field must be a valid mobile number.',
                'phone_number.unique' => 'The :attribute has already been taken.',
            ])->validateWithBag('updateProfileInformation');

        if ($input['email'] !== $user->email &&
            $user instanceof MustVerifyEmail) {
            $this->updateVerifiedUser($user, $input);
        } else {
            $user->forceFill([
                'name' => $input['name'],
                'email' => $input['email'],
                'phone_number' => $input['phone_number'],
            ]);

            DB::transaction(function () use ($input, $user, $inputPhoneNumber): void {
                $user->name = $input['name'];
                $user->email = $input['email'];

                if ($user->phone_number != $inputPhoneNumber) {

                    $user->phone_number = $inputPhoneNumber;
                    SendSmsVerificationCode::dispatch($inputPhoneNumber);
                }

                $user->save();
            });
        }
    }

    /**
     * Update the given verified user's profile information.
     *
     * @param  array<string, string>  $input
     */
    protected function updateVerifiedUser(User $user, array $input): void
    {
        $user->forceFill([
            'name' => $input['name'],
            'email' => $input['email'],
            'email_verified_at' => null,
        ])->save();

        $user->sendEmailVerificationNotification();
    }
}
