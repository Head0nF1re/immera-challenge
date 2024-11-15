<?php

namespace App\Infrastructure\Services;

use App\Models\User;
use Twilio\Rest\Client as TwilioSdk;

class TwilioService
{
    public function __construct(
        private TwilioSdk $sdk,
        private string $service
    ) {}

    /**
     * Verifies phone number using SMS. Phone number must be in E.164 format.
     */
    public function sendVerificationCode(string $phoneNumber): void
    {
        $this->sdk->verify->v2
            ->services($this->service)
            ->verifications
            ->create($phoneNumber, 'sms');
    }

    /**
     * Verifies SMS code
     */
    public function verifyCode(User $user, string $code): void
    {
        $this->sdk->verify->v2
            ->services($this->service)
            ->verificationChecks
            ->create([
                'to' => $user->phone_number,
                'code' => $code,
            ]);

    }
}
