<?php

namespace App\Macros;

use Propaganistas\LaravelPhone\PhoneNumber;

class PhoneNumberMacros
{
    public static function register(): void
    {
        PhoneNumber::macro('toFormatE164', function (?string $phoneNumber): ?string {
            $phone = (new PhoneNumber($phoneNumber, 'PT'));

            if ($phone->isValid()) {
                $phoneNumber = $phone->formatE164();
            }

            return $phoneNumber;
        });
    }
}
