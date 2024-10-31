<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize()
    {
        // Optionally, implement authorization checks here
        return true;
    }

    public function rules()
    {
        return [
            'client_id' => 'required|exists:clients,id', // Ensure client exists
            'status_id' => 'required|exists:statuses,id', // Ensure status exists
            'total_amount' => 'required|numeric|min:0', // Validate total amount
            'product_name' => 'required|string',
        ];
    }
}
