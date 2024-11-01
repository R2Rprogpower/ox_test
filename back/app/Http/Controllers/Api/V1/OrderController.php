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
        return Order::with([
            'client',
            'statuses' => function ($query) {
                $query->orderBy('id', 'desc'); // Order statuses by created_at descending
            }
        ])->get();    
    }

    public function store(StoreOrderRequest $request)
    {
        $order = Order::create($request->validated());
 
        $order->statuses()->attach($request->status_id);
    
        return response()->json($order->load('statuses'), 201); // Return the order with statuses
    }
    
   

    public function show(Order $order)
    {
        return $order->load(['client', 'statuses' => function ($query) {
            $query->orderBy('order_status.id', 'desc'); // Order statuses by created_at descending from the pivot table
        }]);    }

    public function update(UpdateOrderRequest $request, Order $order)
    {
        $order->update($request->validated());
        if ($request->status_id) {
            $order->statuses()->attach($request->status_id);
        }

        $order->load(['statuses' => function ($query) {
            $query->orderBy('order_status.id', 'desc'); // Order statuses by created_at descending from the pivot table
        }]);
  
        return response()->json($order);
    }
    public function destroy(Order $order)
    {
        // Delete the order
        $order->delete();
        return response()->json(null, 204); // Return no content
    }
}