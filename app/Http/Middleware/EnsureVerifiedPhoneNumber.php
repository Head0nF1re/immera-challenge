<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureVerifiedPhoneNumber
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()->hasVerifiedPhoneNumber())
        {
            return response()->json([
                "message" => "Phone number is not verified",
                "verify_phone_url" => route('auth.verify_phone_number')
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
