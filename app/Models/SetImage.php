<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($setImage) {
            Storage::disk('local')->delete('public/sets/' . $setImage->imageid);
        });
    }
}
