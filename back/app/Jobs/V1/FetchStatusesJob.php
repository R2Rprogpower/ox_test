<?php

namespace App\Jobs\V1;

use App\Models\V1\Client;
use App\Models\V1\Status;
use App\Services\V1\KeepinCrmApiService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class FetchStatusesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        // ini_set('memory_limit', value: '512M');

        // Fetch the clients from the KeepinCRM API
        $service = app()->make(KeepinCrmApiService::class);
        $allStatuses = $service->getAllStatuses(); // Assuming this fetches all pages and returns combined clients.


        // $status = Status::where('name', $client['status']['name'])->first();
        // $source = Source::where('name', $client['source']['name'])->first();
        // $office = Office::find($client['office']['id']);
        // $mainResponsible = User::find($client['main_responsible']['id']);
        foreach ($allStatuses as $status) {
            Status::create([
                'name' => $status['name'] ?? "",  // The name of the status
                'color' => $status['color'] ?? "",  // The color associated with the status
                'kind' => $status['kind'] ?? "",  // The kind of the status (e.g., lead, closed)
            ]);
        }
                
    



        // Save the clients data to a JSON file
        $filePath = 'logs/statuses.json'; // Path relative to storage/app/
        Storage::disk('local')->put($filePath, json_encode($allStatuses, JSON_PRETTY_PRINT));

        // // Optionally, log the saved path
        // logger()->info("Clients data saved to: " . storage_path("app/{$filePath}"));
    }
}
