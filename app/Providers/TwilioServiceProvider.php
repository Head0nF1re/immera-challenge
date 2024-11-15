<?php

namespace App\Providers;

use App\Infrastructure\Services\TwilioService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;
use Twilio\Rest\Client as TwilioSdk;

class TwilioServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->scoped(TwilioService::class, function (Application $app) {

            $sdk = new TwilioSdk(config('services.twilio.sid'), config('services.twilio.token'));

            return new TwilioService($sdk, config('services.twilio.service'));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
