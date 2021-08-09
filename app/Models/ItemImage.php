<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ItemImage extends Model
{
    use HasFactory;

    protected $primaryKey = 'imageid';
    protected $casts = ['imageid' => 'string'];
    public $incrementing = false;

    protected $fillable = [
        'imageid',
        'itemid'
    ];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($itemImage) {
            Storage::disk('local')->delete('public/items/' . $itemImage->imageid);
        });
    }
}
