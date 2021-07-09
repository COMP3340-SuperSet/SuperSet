<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\SetImageController;
use App\Http\Controllers\ItemImageController;
use App\Http\Controllers\SettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/* 
    PUBLIC ROUTES
*/

//auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/check', [AuthController::class, 'check']);

//user
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/search/{query}', [UserController::class, 'search']);
Route::get('/user/{userid}', [UserController::class, 'show']);

//user - protected
Route::middleware('auth:sanctum', 'owner')->put('/user/{userid}', [UserController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/user/image', [UserController::class, 'update_image']);

//sets
Route::get('/sets', [SetController::class, 'index']);
Route::get('/sets/search/{query}', [SetController::class, 'search']);
Route::get('/sets/{setid}', [SetController::class, 'show']);
Route::get('/user/sets/{userid}', [SetController::class, 'getUserSets']);

//sets - protected
Route::middleware('auth:sanctum', 'owner')->put('/sets/{setid}', [SetController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/sets', [SetController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->delete('sets/{setid}', [SetController::class, 'destroy']);

//items
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{itemid}', [ItemController::class, 'show']);

//items - protected
Route::middleware('auth:sanctum', 'owner')->put('/item/{itemid}', [ItemController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/items', [ItemController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->delete('/items', [ItemController::class, 'destroy']);

//setImage
Route::get('/setImages', [SetImageController::class, 'index']);
Route::get('/setImages/{imageid}', [SetImageController::class, 'show']);

//setImage - protected
Route::middleware('auth:sanctum', 'owner')->put('/setImages/{imageid}', [SetImageController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/setImages/{setid}', [SetImageController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->delete('/setImages/{imageid}', [SetImageController::class, 'destroy']);

//itemImage 
Route::get('/itemImages', [ItemImageController::class, 'index']);
Route::get('/itemImages/{imageid}', [ItemImageController::class, 'show']);

//itemImage - protected
Route::middleware('auth:sanctum', 'owner')->put('/itemImages/{imageid}', [ItemImageController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/itemImages/{itemid}', [ItemImageController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->delete('/itemImages/{imageid}', [ItemImageController::class, 'destroy']);

//settings - protected
Route::middleware('auth:sanctum')->get('/settings', [SettingController::class, 'index']);
Route::middleware('auth:sanctum')->get('/settings/{setting}', [SettingController::class, 'show']);
Route::middleware('auth:sanctum')->post('/settings', [SettingController::class, 'store']);
Route::middleware('auth:sanctum')->put('/settings', [SettingController::class, 'update']);
