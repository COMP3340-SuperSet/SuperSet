<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Set extends Model
{
    use HasFactory;
    protected $primaryKey = 'setid';

    protected $fillable = [
        'userid',
        'name',
        'description',
        'imageid'
    ];
}
