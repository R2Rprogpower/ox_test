<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreOrderRequest;
use App\Http\Requests\Api\V1\UpdateOrderRequest;
use App\Models\V1\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        // Return all orders with associated client and status
        return Order::with(['client', 'statuses'])->get();
    }
    public function store(StoreOrderRequest $request)
    {
        $order = Order::create($request->validated());
        return response()->json($order, 201);
    }
    
   

    public function show(Order $order)
    {
        return $order->load(['client', 'status']);
    }

    public function update(UpdateOrderRequest $request, Order $order)
    {
        $order->update($request->validated());
        return response()->json($order);
    }
    public function destroy(Order $order)
    {
        // Delete the order
        $order->delete();
        return response()->json(null, 204); // Return no content
    }
}