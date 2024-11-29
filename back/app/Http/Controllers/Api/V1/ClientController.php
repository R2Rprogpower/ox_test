<?php

namespace App\Http\Controllers\Api\V1;


use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreClientRequest;
use App\Http\Requests\Api\V1\UpdateClientRequest;
use App\Models\V1\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return Client::all();
    }

    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->validated());
        return response()->json($client, 201);
    }
    public function show(Client $client)
    {
        return $client;
    }
    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());
        return response()->json($client);
    }


    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(null, 204);
    }
}