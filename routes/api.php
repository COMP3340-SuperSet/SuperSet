<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\SetImageController;
use App\Http\Controllers\ItemImageController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/* 
    PUBLIC ROUTES
*/

//search
Route::get('/search/{term}', [SearchController::class, 'search']);
Route::get('/users/search/{term}', [SearchController::class, 'searchUsers']);
Route::get('/sets/search/{term}', [SearchController::class, 'searchSets']);

//auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//user
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/search/{query}', [UserController::class, 'search']);
Route::get('/user/{userid}', [UserController::class, 'show']);
Route::get('/user/sets/{userid}', [UserController::class, 'getSets']);

//user - [protected]
Route::put('/user/{userid}', [UserController::class, 'update']);
Route::post('/user/{userid}/image', [UserController::class, 'update_image']);

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
Route::get('/items/set/{setid}', [SetController::class, 'getItems']);

//items - protected
Route::put('/item/{itemid}', [ItemController::class, 'update']);
Route::post('/items', [ItemController::class, 'store']);
Route::delete('/items/{itemid}', [ItemController::class, 'destroy']);

//setImage
Route::get('/setImages', [SetImageController::class, 'index']);
Route::get('/setImages/{imageid}', [SetImageController::class, 'show']);

//setImage - protected
Route::put('/setImages/{imageid}', [SetImageController::class, 'update']);
Route::post('/setImages/{setid}', [SetImageController::class, 'store']);
Route::delete('/setImages/{imageid}', [SetImageController::class, 'destroy']);

//itemImage 
Route::get('/itemImages', [ItemImageController::class, 'index']);
Route::get('/itemImages/{imageid}', [ItemImageController::class, 'show']);

//itemImage - protected
Route::put('/itemImages/{imageid}', [ItemImageController::class, 'update']);
Route::post('/itemImages/{itemid}', [ItemImageController::class, 'store']);
Route::delete('/itemImages/{imageid}', [ItemImageController::class, 'destroy']);

//settings - protected
Route::get('/settings', [SettingController::class, 'index']);
Route::get('/settings/{setting}', [SettingController::class, 'show']);
Route::post('/settings', [SettingController::class, 'store']);
Route::put('/settings', [SettingController::class, 'update']);
