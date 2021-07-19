<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\SetImageController;
use App\Http\Controllers\ItemImageController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\FeedbackController;
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
Route::get('/check', [AuthController::class, 'check']);

//user
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/search/{query}', [UserController::class, 'search']);
Route::get('/user/{userid}', [UserController::class, 'show']);
Route::get('/user/role/{userid}', [AuthController::class, 'getRole']);

//user - protected

Route::middleware('auth:sanctum', 'owner')->put('/user', [UserController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/user/image', [UserController::class, 'update_image']);
Route::middleware('auth:sanctum')->delete('/user', [UserController::class, 'destroyUser']);


//sets
Route::get('/sets', [SetController::class, 'index']);
Route::get('/sets/search/{query}', [SetController::class, 'search']);
Route::get('/sets/{setid}', [SetController::class, 'show']);
Route::get('/user/sets/{userid}', [SetController::class, 'getUserSets']);

//sets - protected
Route::middleware('auth:sanctum', 'owner')->put('/set', [SetController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/set', [SetController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->delete('/set', [SetController::class, 'destroySet']);

//items
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{itemid}', [ItemController::class, 'show']);

//items - protected
Route::middleware('auth:sanctum', 'owner')->put('/item', [ItemController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/item', [ItemController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->delete('/item', [ItemController::class, 'destroyItem']);

//setImage
Route::get('/setImages', [SetImageController::class, 'index']);
Route::get('/setImages/{imageid}', [SetImageController::class, 'show']);

//setImage - protected
Route::middleware('auth:sanctum', 'owner')->put('/setImage', [SetImageController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/setImage', [SetImageController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->delete('/setImage', [SetImageController::class, 'destroySetImage']);

//itemImage 
Route::get('/itemImages', [ItemImageController::class, 'index']);
Route::get('/itemImages/{imageid}', [ItemImageController::class, 'show']);

//itemImage - protected
Route::middleware('auth:sanctum', 'owner')->put('/itemImage', [ItemImageController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/itemImage', [ItemImageController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->delete('/itemImage', [ItemImageController::class, 'destroyItemImage']);

//settings - protected
Route::middleware('auth:sanctum', 'admin:api')->get('/settings', [SettingController::class, 'index']);
Route::middleware('auth:sanctum', 'admin:api')->get('/settings/{setting}', [SettingController::class, 'show']);
Route::middleware('auth:sanctum', 'admin:api')->post('/settings', [SettingController::class, 'store']);
Route::middleware('auth:sanctum', 'admin:api')->put('/settings', [SettingController::class, 'update']);

//feedback
Route::post('/feedback', [FeedbackController::class, 'store']);
Route::get('/feedback', [FeedbackController::class, 'index']);