<?php

namespace App\Features\Auth;

use App\Infrastructure\Services\TwilioService;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class VerifySmsCode
{
    use AsAction;

    public function __construct(
        private TwilioService $twilio) {}

    public function handle(User $user, string $code)
    {
        $this->twilio->verifyCode($user, $code);

        $user->phone_number_verified_at = now();
        $user->save();
    }

    public function asController(VerifySmsCodeRequest $request)
    {
        $this->handle(
            Auth::user(),
            $request->code,
        );

        return response(status: Response::HTTP_OK);
    }
}

class VerifySmsCodeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => [
                'required',
                'string',
                'size:6',
            ],
        ];
    }
}
