<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Jobs\V1\FetchClientsJob;
use App\Jobs\V1\FetchStatusesJob;
use Illuminate\Http\JsonResponse;

use App\Services\V1\KeepinCrmApiService;

use Illuminate\Http\Request;

class KeepinCrmController extends Controller
{
    protected $crmApiService;

    public function __construct(KeepinCrmApiService $crmApiService)
    {
        $this->crmApiService = $crmApiService;
    }

    public function fetchAgreements(): JsonResponse
    {
        $data = $this->crmApiService->request('agreements');
     
        return response()->json($data);
    }

    public function fetchTasks(): JsonResponse
    {
        $data = $this->crmApiService->request('tasks');
        return response()->json($data);
    }

    public function fetchStatuses(): JsonResponse
    {
        // $data = $this->crmApiService->request('statuses', [
         
        //     'q[ordered_at_gteq]' => '2024-11-20',
        //     // 'page' => 1,
        // ]);


        dispatch(new FetchStatusesJob());



        return response()->json('');
    }

    public function fetchClients(): JsonResponse
    {
     
        // $data = $this->crmApiService->getAllClients();   dd($data);
        dispatch(new FetchClientsJob());
        return response()->json([]);
    }
}
