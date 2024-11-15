<?php

namespace App\Providers;

use App\Infrastructure\Service\TwilioHttpClient;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;
use Twilio\Rest\Client as TwilioSdk;

class TwilioServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(TwilioHttpClient::class, function (Application $app) {

            $client = new TwilioSdk(config('services.twilio.sid'), config('services.twilio.token'));
            return new TwilioHttpClient($request);
        })
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
