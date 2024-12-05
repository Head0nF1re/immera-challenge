<?php

namespace App\Providers;

use App\Macros\PhoneNumberMacros;
use Illuminate\Support\ServiceProvider;
use Propaganistas\LaravelPhone\PhoneNumber;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        PhoneNumberMacros::register();
        // PhoneNumber::macro('toFormatE164', function (?string $phoneNumber) {
        //     $phone = (new PhoneNumber($phoneNumber, 'PT'));

        //     if ($phone->isValid()) {
        //         $phoneNumber = $phone->formatE164();
        //     }

        //     return $phoneNumber;
        // });
    }
}
