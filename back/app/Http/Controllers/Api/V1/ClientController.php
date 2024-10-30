<?php

namespace App\Http\Controllers\Api\V1;


use App\Http\Controllers\Controller;
use App\Models\V1\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return Client::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:clients,email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $client = Client::create($validated);
        return response()->json($client, 201);
    }

    public function show(Client $client)
    {
        return $client;
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:clients,email,' . $client->id,
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);
        
        $fillableAttributes = $client->getFillable();

        if ($request->isMethod('put')) {
            $validated = $request->validate(array_fill_keys($fillableAttributes, 'required|string'));
        } else {
            $validated = $request->validate(array_fill_keys($fillableAttributes, 'sometimes|string'));
        }
    
        $client->update($validated);
        return response()->json($client);
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(null, 204);
    }
}