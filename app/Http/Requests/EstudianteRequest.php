<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EstudianteRequest extends FormRequest
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
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'nombre_padre' => 'required|string|max:255',
            'nombre_madre' => 'required|string|max:255',
            'grado' => 'required|string|max:50',
            'seccion' => 'required|string|max:50',
            'fecha_ingreso' => 'required|date',
        ];
    }
    public function messages()
    {
        return [
            'nombre.required' => 'El nombre es obligatorio.',
            'fecha_nacimiento.required' => 'Debe ingresar una fecha válida.',
            'nombre_padre.required' => 'El nombre del padre es obligatorio.',
            'nombre_madre.required' => 'El nombre del madre es obligatorio.',
            'grado.required' => 'El grado es obligatorio.',
            'seccion.required' => 'la seccion es obligatorio.',
            'seccion.required' => 'la seccion es obligatorio.',
            'fecha_ingreso.required' => 'la fecha de ingreso es obligatorio.',
            
        ];
    }
    public function failedValidation(Validator $validator)
{
    throw new HttpResponseException(response()->json([
        'success' => false,
        'message' => 'Errores de validación',
        'errors' => $validator->errors()
    ], 422));
}
}
