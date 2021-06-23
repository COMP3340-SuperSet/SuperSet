<?php

use App\Http\Controllers\SetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


//users
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/search/{query}', [UserController::class, 'search']);
Route::get('/user/{userid}', [UserController::class, 'show']);

//sets
Route::get('/sets', [SetController::class, 'index']);
Route::get('/sets/search/{query}', [SetController::class, 'search']);
Route::get('/set/{setid}', [SetController::class, 'show']);

//items
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{itemid}', [ItemController::class, 'show']);

Route::get('/uuid', function () {
    return (string) Str::uuid();
});

Route::post('/upload', function (Request $request) {
    if($request->hasFile('image')){
        $fileName = 'images/'.(string) Str::uuid();
        Storage::disk('local')->put($fileName, $request->file('image'));
    }else{
        return response()->json(['error'=>'Could not find attached file.'], 400);
    }
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

