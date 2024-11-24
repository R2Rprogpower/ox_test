<?php

namespace App\Services\V1;

use Illuminate\Support\Facades\Http;

class KeepinCrmApiService
{
    protected $baseUrl;
    protected $apiToken;

    public function __construct()
    {
        $this->baseUrl = config('services.keepincrm.base_url'); // Base URL from config
        $this->apiToken = config('services.keepincrm.api_token'); // API Token from config
    }

    public function request(string $endpoint, array $params = [])
    {
        $params = [
         
            'q[ordered_at_gteq]' => '2024-11-10',
            // 'page' => 1,
        ];


        return Http::withHeaders([
            'X-Auth-Token' => $this->apiToken,
        ])
            ->get("{$this->baseUrl}/{$endpoint}", $params)
            ->json();
    }

    public function getAllClients()
    {
        $allClients = [];
        $page = 1;

        do {
            $response = $this->fetchClientsPage($page);
            if ($response->failed()) {
                throw new \Exception("Failed to fetch clients: " . $response->body());
            }

            $data = $response->json();
            $allClients = array_merge($allClients, $data['items']);
            $page++;

        } while ($page <= $data['pagination']['total_pages']);

        return $allClients;
    }

    protected function fetchClientsPage($page)
    {
        return Http::withHeaders([
            'X-Auth-Token' => $this->apiToken,
        ])->get("{$this->baseUrl}/clients", [

            'q[registered_at_gteq]' => '2024-11-20',
            'page' => $page,
        ]);
    }

    public function getAllStatuses()
    {
        $allStatuses = [];
        $page = 1;
    
        do {
            $response = $this->fetchStatusesPage($page);
            if ($response->failed()) {
                throw new \Exception("Failed to fetch statuses: " . $response->body());
            }
    
            $data = $response->json();
            $allStatuses = array_merge($allStatuses, $data['items']);
            $page++;
    
        } while ($page <= $data['pagination']['total_pages']);
    
        return $allStatuses;
    }
    
    public function fetchStatusesPage()
    {
        return Http::withHeaders([
            'X-Auth-Token' => $this->apiToken,
        ])->get("{$this->baseUrl}/clients/statuses", [
    
            // Include any necessary filters for statuses, like a date range or status type
            // 'q[created_at_gteq]' => '2024-11-20',
            'lead' => "true",
            // 'page' => 1,
        ]);
    }
}
