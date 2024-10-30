<?php

namespace Database\Seeders;

use App\Models\V1\Client;
use App\Models\V1\Order;
use App\Models\V1\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = Client::all();
        $statuses = Status::all();

        // Create some orders
        foreach ($clients as $client) {
            Order::create([
                'client_id' => $client->id, // Creating a new client
                'status_id' => $statuses->random()->id, // Assign a random status
                'product_name' => \Faker\Factory::create()->word, // Assign a product name using Faker
                'total_amount' => rand(100, 1000), // Assign a random total amount
            ]);
        }

    }
}
