<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStatusRequest extends FormRequest
{
    public function authorize()
    {
        // Optionally, apply authorization checks here
        return true;
    }

    public function rules()
    {
        $statusId = $this->route('status')->id;

        return [
            'name' => 'sometimes|string|unique:statuses,name,' . $statusId,
        ];
    }
}
