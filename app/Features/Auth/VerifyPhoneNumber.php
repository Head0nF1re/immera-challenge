<?php

namespace App\Features\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;

class VerifyPhoneNumber
{
    use AsAction;

    public function handle(string $phoneNumber)
    {
        
    }

    public function asController(Request $request)
    {
        $this->handle(
            $request->user(), 
            $request->get('password')
        );

        return redirect()->back();
    }
}

class VerifyPhoneNumberRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        ];
    }
}
