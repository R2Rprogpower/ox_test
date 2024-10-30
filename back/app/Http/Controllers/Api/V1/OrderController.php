<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Models\V1\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        // Return all orders with associated client and status
        return Order::with(['client', 'status'])->get();
    }

    public function store(Request $request)
    {
        // Validate request data
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id', // Ensure client exists
            'status_id' => 'required|exists:statuses,id', // Ensure status exists
            'total_amount' => 'required|numeric|min:0', // Validate total amount
            'product_name' => 'required|string',

        ]);

        // Create a new order
        $order = Order::create($validated);
        return response()->json($order, 201); // Return created order
    }

    public function show(Order $order)
    {
        return $order->load(['client', 'status']);
    }

    public function update(Request $request, Order $order)
    {
        //@todo: validate put and patch.
        //@todo: rewrite to form requests!!!!.

        $validated = $request->validate([
            'client_id' => 'sometimes|exists:clients,id', // Ensure client exists
            'status_id' => 'sometimes|exists:statuses,id', // Ensure status exists
            'total_amount' => 'sometimes|numeric|min:0', // Validate total amount
            'product_name' => 'sometimes|string',

        ]);

        // Update the order with validated data
        $order->update($validated);
        return response()->json($order);
    }

    public function destroy(Order $order)
    {
        // Delete the order
        $order->delete();
        return response()->json(null, 204); // Return no content
    }
}