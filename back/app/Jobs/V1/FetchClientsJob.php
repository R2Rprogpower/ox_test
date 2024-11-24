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

class FetchClientsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        // ini_set('memory_limit', value: '512M');

        // Fetch the clients from the KeepinCRM API
        $service = app()->make(KeepinCrmApiService::class);
        $allClients = $service->getAllClients(); // Assuming this fetches all pages and returns combined clients.


        $statuses = Status::all();



        // $source = Source::where('name', $client['source']['name'])->first();
        // $office = Office::find($client['office']['id']);
        // $mainResponsible = User::find($client['main_responsible']['id']);
        foreach ($allClients as $client) {

 

            $clientModel = Client::updateOrCreate([
                'id' => intval($client['id']) ] ,[
                'person' => $client['person'],
                'company' => $client['company'],
                'lead' => $client['lead'],
                'comment' => $client['comment'],
                'tag_names' => $client['tag_names'],
                'important' => $client['important'],
                'currency' => $client['currency'],
                'agreements_count' => $client['agreements_count'],
                'position' => $client['position'],
                'archived' => $client['archived'],
                'tags' => $client['tags'],
                'emails' => $client['emails'],
                'phones' => $client['phones'],
                'paid_amount' => $client['paid_amount'],
                'credit_amount' => $client['credit_amount'],
                'total_amount' => $client['total_amount'],
                'balance_amount' => $client['balance_amount'],
                // 'status_id' => $status ? $status->id : null,
                // 'source_id' => $source ? $source->id : null,
                // 'office_id' => $office ? $office->id : null,
                // 'main_responsible_id' => $mainResponsible ? $mainResponsible->id : null,
            ]);
      
            $status = null;
            if (!empty($client['status'])) {
                // Check if the status exists
                $status = $statuses->firstWhere('name', $client['status']['name']);
            
                if (!$status) {

                    $status = Status::firstOrCreate(
                        ['name' => $client['status']['name']], // Unique column to check
                        [
                            'color' => $client['status']['color'],
                            'kind' => $client['status']['kind'],
                        ]
                    );
                    
                }
            }
            
            // Attach the status to the client
            if ($status) {
                // Get the most recent status of the client
                $lastStatus = $clientModel->statuses()->latest('created_at')->first();
            
                // Check if the status has changed
                if (!$lastStatus || $lastStatus->id !== $status->id) {
                    $clientModel->statuses()->attach($status->id, [
                        'created_at' => now(), // Set created_at manually
                        'updated_at' => null, // Leave updated_at as null or do not set it
                    ]);                
                }
            }
        }
        
    



        // Save the clients data to a JSON file
        // $filePath = 'logs/clients.json'; // Path relative to storage/app/
        // Storage::disk('local')->put($filePath, json_encode($allClients, JSON_PRETTY_PRINT));

        // // Optionally, log the saved path
        // logger()->info("Clients data saved to: " . storage_path("app/{$filePath}"));
    }
}
