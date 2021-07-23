<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $primaryKey = 'itemid';

    protected $fillable = [
        'name',
        'description',
        'setid',
        'imageid'
    ];
}
