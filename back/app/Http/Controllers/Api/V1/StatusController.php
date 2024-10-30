<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\V1\Status;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StatusController extends Controller
{
    public function index()
    {
        return Status::all(); // Get all statuses
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:statuses,name',
        ]);

        $status = Status::create($validated);
        return response()->json($status, 201);
    }

    public function show(Status $status)
    {
        return $status; // Get a specific status
    }

    public function update(Request $request, Status $status)
    {
        //@todo: validate put and patch.
        $validated = $request->validate([
            'name' => 'sometimes|string|unique:statuses,name,' . $status->id,
        ]);

        $status->update($validated);
        return response()->json($status);
    }

    public function destroy(Status $status)
    {
        $status->delete();
        return response()->json(null, 204);
    }
}