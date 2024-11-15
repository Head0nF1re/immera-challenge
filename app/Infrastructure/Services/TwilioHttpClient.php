<?php

namespace App\Infrastructure\Service;

use Illuminate\Http\Client\PendingRequest;

class TwilioHttpClient
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private PendingRequest $request
    )
    {
        //
    }

    public function getWidget(string $uid)
    {
        // $response = $this->request
        //     ->withUrlParameters(['uid' => $uid])
        //     ->get('widget/{uid}');
 
        // return new Widget($response->json());
    }
}
