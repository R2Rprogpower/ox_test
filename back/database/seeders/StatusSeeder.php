<?php

namespace Database\Seeders;

use App\Models\V1\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['pending', 'processing', 'completed', 'cancelled']; // Add more statuses if needed

        foreach ($statuses as $status) {
            Status::create(['name' => $status]);
        }
    }
}
