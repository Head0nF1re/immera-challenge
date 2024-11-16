## Installation

To run this project, do the following:

1. Clone the project.
2. Install composer dependencies using docker and start [Sail](https://laravel.com/docs/11.x/sail#configuring-a-shell-alias):

```sh
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
```
```sh
sail up -d
```

3. Copy `.env.example` to `.env` and generate the [encryption key](https://laravel.com/docs/11.x/encryption#configuration):
```sh
cp .env.example .env && sail artisan key:generate
```

There is an integration with [Twilio](https://www.twilio.com/docs/verify) for phone number verification with SMS. If you want 
to test that feature, you need to setup your test account and provide the following env vars in `.env`:
```
TWILIO_SERVICE=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_BASE_URL=
```

Also, start the queue worker:
```sh
sail artisan queue:work
```

Otherwise, use the seeded test user (created in the next step) that already has the phone verified:
```
email: 1_test@test.com
password: password
```

4. Run migrations and seeders:
```sh
sail artisan migrate --seed
```

Note: to run commands for the frontend (e.g. `npm`/`pnpm`), go inside the container:
```sh
sail shell
cd Frontend
npm
```


