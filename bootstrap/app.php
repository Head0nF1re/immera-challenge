<?php

use App\Http\Middleware\EnsureVerifiedPhoneNumber;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();

        $middleware->appendToGroup('verified_user', [
            'auth:sanctum',
            EnsureVerifiedPhoneNumber::class,
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Override default message, e.g. Model::findOrFail returns a message with the model namespace
        $exceptions->render(fn (NotFoundHttpException $e, Request $request) => response(status: Response::HTTP_NOT_FOUND));

    })->create();
