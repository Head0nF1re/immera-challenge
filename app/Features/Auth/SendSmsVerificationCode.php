<?php

namespace App\Features\Auth;

use App\Infrastructure\Services\TwilioService;
use App\Models\User;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Lorisleiva\Actions\Concerns\AsAction;

class SendSmsVerificationCode
{
    use AsAction;

    public function __construct(
        private TwilioService $twilio) {}

    public function handle(string $phoneNumber)
    {
        $this->twilio->sendVerificationCode($phoneNumber);
    }

    public function asController()
    {
        $this->handle(Auth::user()->phone_number);

        return response(status: Response::HTTP_ACCEPTED);
    }
}

// class VerifyPhoneNumberRequest extends FormRequest
// {
//     /**
//      * Get the validation rules that apply to the request.
//      *
//      * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
//      */
//     public function rules(): array
//     {
//         return [
//             'phone_number' => [
//                 'required',
//                 'phone:mobile',
//                 Rule::exists(User::class)->where(function (Builder $query) {
//                     return $query->where('user_id', Auth::id());
//                 }),
//             ],
//         ];
//     }
// }
