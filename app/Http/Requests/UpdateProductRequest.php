<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        if ($this->user()->isAdmin()) {
            return true;
        }


        if ($this->has('article')) {
            $this->mess();
            return false;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {

        if ($this->user()->isAdmin()) {
            return [
                'name' => 'required|min:10',
                'article' => 'required|unique:products,article,' . $this->id . '|regex:/^[a-zA-Z0-9]+$/',
                'status' => 'sometimes|in:available,unavailable',
                'data' => 'sometimes'
            ];
        }

        return [
            'name' => 'required|min:10',
            'status' => 'sometimes|in:available,unavailable',
            'data' => 'sometimes'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function mess()
    {
        abort(403, 'Только администратор может редактировать поле Артикул');
    }
}
