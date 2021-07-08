<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;

class Owner
{
    protected $auth;

    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    public function handle(Request $request, Closure $next)
    {
        if (Auth::user()->role == 1) {
            return $next($request);
        }else{
            return response()->json(['error' => 'This route can only be used by admins.'], 401);
        }
    }
}
