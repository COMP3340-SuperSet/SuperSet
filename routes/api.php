<?php

use App\Http\Controllers\SetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//users
Route::get('/users', [UserController::class, 'index']);
Route::get('/user/{userid}', [UserController::class, 'show']);

//sets
Route::get('/sets', [SetController::class, 'index']);
Route::get('/set/{setid}', [SetController::class, 'show']);

//items
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{itemid}', [ItemController::class, 'show']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
