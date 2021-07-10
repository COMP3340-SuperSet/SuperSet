<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;

class Admin
{
    protected $auth;

    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    public function handle(Request $request, Closure $next, $routeType)
    {
        if (Auth::user()->role == 1) {
            return $next($request);
        }else{
            if($routeType == "web"){
                //todo: make custom view on front to tell the user this route is restricted
                return redirect('/login');
            }//else == api, return json
            return response()->json(['error' => 'This route can only be used by admins.'], 401);
        }
    }
}