<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;
    protected $primaryKey = 'feedbackid';

    protected $fillable = [
        'email',
        'contact',
        'content',
        'rating'
    ];

}
