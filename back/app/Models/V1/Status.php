<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    /** @use HasFactory<\Database\Factories\StatusFactory> */
    use HasFactory;

    // Fillable fields to allow mass assignment
    protected $fillable = [
        'name', 
        'color', 
        'kind',
    ];

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'status_client')
        ->withTimestamps()
        ->withPivot('created_at'); // Ensure you are using withTimestamps
    }

}
