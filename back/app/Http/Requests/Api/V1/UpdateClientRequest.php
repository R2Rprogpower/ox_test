<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{
    public function authorize()
    {
        // Optionally, apply authorization checks here
        return true;
    }

    public function rules()
    {
        $clientId = $this->route('client')->id;

        if ($this->isMethod('put')) {
            return [
                'name' => 'required|string',
                'email' => 'required|email|unique:clients,email,' . $clientId,
                'phone' => 'nullable|string',
                'address' => 'nullable|string',
            ];
        }

        return [
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:clients,email,' . $clientId,
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ];
    }
}
