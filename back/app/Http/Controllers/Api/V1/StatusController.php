<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\V1\Status;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreStatusRequest;
use App\Http\Requests\Api\V1\UpdateStatusRequest;

class StatusController extends Controller
{
    public function index()
    {
        return Status::all(); // Get all statuses
    }

    public function store(StoreStatusRequest $request)
    {
        $status = Status::create($request->validated());
        return response()->json($status, 201);
    }
    

    public function show(Status $status)
    {
        return $status; // Get a specific status
    }

    public function update(UpdateStatusRequest $request, Status $status)
    {
        $status->update($request->validated());
        return response()->json($status);
    }

    public function destroy(Status $status)
    {
        $status->delete();
        return response()->json(null, 204);
    }
}