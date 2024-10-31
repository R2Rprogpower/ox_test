<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreStatusRequest extends FormRequest
{
    public function authorize()
    {
        // Optionally, apply authorization checks here
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|unique:statuses,name',
        ];
    }
}