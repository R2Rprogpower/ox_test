<?php

namespace Database\Factories;

use App\Models\V1\Client;
use App\Models\V1\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => Client::factory(),
            'status_id' => Status::factory(), // Create a new status instance
            'product_name' => $this->faker->word,
            'amount' => $this->faker->randomFloat(2, 10, 100),
        ];
    }
}
