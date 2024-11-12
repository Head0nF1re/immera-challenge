<?php

namespace App\Rules;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Propaganistas\LaravelPhone\PhoneNumber;

/**
 * WIP
 */
class UniquePhoneNumber implements ValidationRule, DataAwareRule, ValidatorAwareRule
{
    /**
     * All of the data under validation.
     *
     * @var array<string, mixed>
     */
    protected $data = [];

    /**
     * The validator instance.
     *
     * @var \Illuminate\Validation\Validator
     */
    protected $validator;

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $phone = new PhoneNumber($value ?? null, 'PT');

        if (!$phone->isValid() || ($phone->isValid() && !$phone->isOfType('mobile'))) {
            $fail('The :attribute field must be a valid mobile number.');
            return;
        }
        
        // Transform to the saved format, unique rule may fail if there is a space between the numbers
        $this->data['phone_number'] = $phone->formatE164();
        $this->validator->addRules([$attribute => Rule::unique(User::class, 'phone_number')]);
    }

    /**
     * Set the data under validation.
     *
     * @param  array<string, mixed>  $data
     */
    public function setData(array $data): static
    {
        $this->data = $data;
 
        return $this;
    }

    /**
     * Set the current validator.
     */
    public function setValidator(Validator $validator): static
    {
        $this->validator = $validator;
 
        return $this;
    }
}
