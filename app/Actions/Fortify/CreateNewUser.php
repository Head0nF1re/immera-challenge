<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Propaganistas\LaravelPhone\PhoneNumber;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $phone = (new PhoneNumber($input['phone_number'] ?? null, 'PT'));

        // Transform to the saved format, unique rule may fail if there is a space between the numbers
        if ($phone->isValid()) {
            $input['phone_number'] = $phone->formatE164();
        }

        Validator::make($input,
            [
                'name' => ['required', 'string', 'max:255'],
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique(User::class),
                ],
                'phone_number' => [
                    'required',
                    'phone:mobile',
                    Rule::unique(User::class),
                ],
                'password' => $this->passwordRules(),
            ],
            [
                'phone' => 'The :attribute field must be a valid mobile number.',
                'phone_number.unique' => 'The :attribute has already been taken.',
            ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'phone_number' => $input['phone_number'],
            'password' => Hash::make($input['password']),
        ]);
    }
}
