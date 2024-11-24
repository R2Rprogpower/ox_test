<?php

namespace App\Models\V1;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [ 'id',
        'person', 'company', 'lead', 'comment', 'tag_names', 'important',
        'currency', 'agreements_count', 'birthday', 'position', 'archived',
        'tags', 'emails', 'phones', 'paid', 'credit', 'total', 'balance',
        'status_id', 'source_id', 'office_id', 'main_responsible_id'
    ];

    protected $casts = [
        'tag_names' => 'array', // cast to array
        'tags' => 'array', // cast to array
        'phones' => 'array', // cast to array
        'emails' => 'array', // cast to array
    ];

    public function statuses()
    {
        return $this->belongsToMany(Status::class, 'status_client')
        ->withTimestamps()
        ->withPivot('created_at');    }

    // public function source()
    // {
    //     return $this->belongsTo(Source::class);
    // }

    // public function office()
    // {
    //     return $this->belongsTo(Office::class);
    // }

    // public function mainResponsible()
    // {
    //     return $this->belongsTo(User::class, 'main_responsible_id');
    // }
}