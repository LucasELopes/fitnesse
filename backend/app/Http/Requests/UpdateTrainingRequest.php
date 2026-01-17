<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrainingRequest extends FormRequest
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
        
            'name' => ['string', 'required', 'min:3', 'max:80'],
            'description' => ['string', 'nullable'],
        ];
        
    }

        public function messages(): array{
        return [
            'name.string' => 'O nome do exercício deve ser em formato de texto.',
            'name.required' => 'O nome do exercício é obrigatório.',
            'name.min' => 'O nome do exercício deve ter no mínimo 3 caracteres.',
            'name.max' => 'O nome do exercício deve ter no máximo 80 caracteres.',
 
            'description.string' => 'A descrição deve estar em formato de texto.',
        ];
    }   
}
