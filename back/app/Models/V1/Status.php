<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    /** @use HasFactory<\Database\Factories\StatusFactory> */
    use HasFactory;
    
    protected $fillable = [
        'name',
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_status')
                    ->withTimestamps();
    }


}
