<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

/* 
    PUBLIC ROUTES
*/

//auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//user
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/search/{query}', [UserController::class, 'search']);
Route::get('/user/{userid}', [UserController::class, 'show']);

//set
Route::get('/sets', [SetController::class, 'index']);
Route::get('/sets/search/{query}', [SetController::class, 'search']);
Route::get('/set/{setid}', [SetController::class, 'show']);

//item
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{itemid}', [ItemController::class, 'show']);

/* 
    PROTECTED ROUTES
*/
Route::group(['middleware' => ['auth:sanctum']], function(){
    //auth
    Route::post('/logout', [AuthController::class, 'logout']);

    //other
    Route::post('/upload', function (Request $request) {
        if($request->hasFile('image')){
            $fileName = 'images/'.(string) Str::uuid();
            Storage::disk('local')->put($fileName, $request->file('image'));
        }else{
            return response()->json(['error'=>'Could not find attached file.'], 400);
        }
    });

    Route::get('/protectedhello', function (Request $request) {
        return 'Protected Hello, World!';
    });
});