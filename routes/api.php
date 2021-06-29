<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\SetImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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

//sets
Route::get('/sets', [SetController::class, 'index']);
Route::get('/sets/search/{query}', [SetController::class, 'search']);
Route::get('/sets/{setid}', [SetController::class, 'show']);

//sets - protected
Route::put('/sets/{setid}', [SetController::class, 'update']);
Route::post('/sets', [SetController::class, 'store']);
Route::delete('sets/{setid}', [SetController::class, 'destroy']);

//items
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{itemid}', [ItemController::class, 'show']);

//items - protected
Route::put('/item/{itemid}', [ItemController::class, 'update']);
Route::post('/items', [ItemController::class, 'store']);
Route::delete('/items/{itemid}', [ItemController::class, 'destroy']);

//setImage
Route::get('/setImages', [SetImageController::class, 'index']);
Route::get('/setImages/{imageid}', [SetImageController::class, 'show']);

//setImage - protected
Route::put('/setImages/{imageid}', [SetImageController::class, 'update']);
// Route::post('/setImages/{setid}', [SetImageController::class, 'store']);
Route::delete('/setImages/{imageid}', [SetImageController::class, 'destroy']);

//itemImage 
Route::get('/itemImages', [ItemImageController::class, 'index']);
Route::get('/itemImages/{imageid}', [ItemImageController::class, 'show']);

//itemImage - protected
Route::put('/itemImages/{imageid}', [ItemImageController::class, 'update']);
Route::post('/itemImages', [ItemImageController::class, 'store']);
Route::delete('/itemImages/{imageid}', [ItemImageController::class, 'destroy']);

// Route::post('/upload', function (Request $request) {

//     if($request->hasFile('image')){
//         $fileName = 'images/'.(string) Str::uuid();
//         Storage::disk('local')->put($fileName, $request->file('image'));
//     }else{
//         return response()->json(['error'=>'Could not find attached file.'], 400);
//     }
// });

// Route::post('/setImages/{setid}', function($setid){
//     error_log('test');
//     // SetImageController->store(setid);
// });

Route::post('/setImages/{setid}', [SetImageController::class, 'store']);