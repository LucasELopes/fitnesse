<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrainingExerciseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'reps' => ['nullable', 'integer'],
            'weight' => ['nullable', 'numeric'],
            'week_day' => ['string', 'required', 'in:seg,ter,qua,qui,sex,sab,dom']
        ];
    }

    public function message(): array{
        return [
            'reps.integer' => 'O campo deve ser um número inteiro.',

            'weight.numeric' => 'O campo deve ser um número.',
        ];
    }
}
