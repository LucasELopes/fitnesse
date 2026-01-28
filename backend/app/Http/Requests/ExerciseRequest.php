<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExerciseRequest extends FormRequest
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
            'exercise_name' => ['string', 'required', 'min:3', 'max:80'],
            'description' => ['string', 'nullable'],
            'tutorial' => ['url', 'nullable'],
        ];
    }

    public function messages(): array{
        return [
            'exercise_name.string' => 'O campo deve ser em texto.',
            'exercise_name.required' => 'O campo é obrigatório.',
            'exercise_name.min' => 'O campo deve ter no mínimo 3 caracteres.',
            'exercise_name.max' => 'O campo deve ter no máximo 80 caracteres.',

            'description.string' => 'O campo deve ser em texto.',

            'tutorial.url' => 'O campo deve ser uma URL válida.',

        ];
    }
}
