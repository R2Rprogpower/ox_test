<?php

namespace Database\Seeders;

use App\Models\V1\Order;
use App\Models\V1\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::all();
        $statuses = Status::all();

        foreach ($orders as $order) {
            $order->statuses()->attach($statuses->random(rand(1, count($statuses))));  
        }
    }
}
