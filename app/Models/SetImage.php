<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SetImage extends Model
{
    use HasFactory;

    protected $primaryKey = 'imageid';
    protected $casts = ['imageid' => 'string'];
    public $incrementing = false;

    protected $fillable = [
        'imageid',
        'setid'
    ];
}
