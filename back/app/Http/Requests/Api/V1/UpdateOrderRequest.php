<?php


namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    public function authorize()
    {
        // Optionally, implement authorization checks here
        return true;
    }

    public function rules()
    {
        return [
            'client_id' => 'sometimes|exists:clients,id', // Ensure client exists
            'status_id' => 'sometimes|exists:statuses,id', // Ensure status exists
            'total_amount' => 'sometimes|numeric|min:0', // Validate total amount
            'product_name' => 'sometimes|string',
        ];
    }

}
