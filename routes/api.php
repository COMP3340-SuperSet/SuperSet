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
use App\Http\Controllers\ReportController;
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
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/check', [AuthController::class, 'check']);
Route::middleware('auth:sanctum', 'owner')->post('/password', [AuthController::class, 'testPassword']);


//user
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/search/{query}', [UserController::class, 'search']);
Route::get('/user/{userid}', [UserController::class, 'show']);
Route::get('/user/role/{userid}', [AuthController::class, 'getRole']);

//user - protected

Route::middleware('auth:sanctum', 'owner')->put('/user', [UserController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/user/image', [UserController::class, 'update_image']);
Route::middleware('auth:sanctum', 'owner')->post('/delete/user', [UserController::class, 'destroyUser']);
Route::middleware('auth:sanctum', 'owner')->post('/delete/user/image', [UserController::class, 'delete_image']);

//sets
Route::get('/sets', [SetController::class, 'index']);
Route::get('/sets/search/{query}', [SetController::class, 'search']);
Route::get('/sets/{setid}', [SetController::class, 'show']);
Route::get('/user/sets/{userid}', [SetController::class, 'getUserSets']);

//sets - protected
Route::middleware('auth:sanctum', 'owner')->put('/set', [SetController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/set', [SetController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->post('/set/delete', [SetController::class, 'destroySet']);

//items
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{itemid}', [ItemController::class, 'show']);
Route::get('/set/{setid}/items', [SetController::class, 'getItems']);

//items - protected
Route::middleware('auth:sanctum', 'owner')->post('/item', [ItemController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->post('/item/update', [ItemController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/item/delete', [ItemController::class, 'destroyItem']);

//setImage
Route::get('/set/image/{imageid}', [SetImageController::class, 'show']);
Route::get('/set/{setid}/images', [SetImageController::class, 'getImages']);

//setImage - protected
Route::middleware('auth:sanctum', 'owner')->put('/setImage', [SetImageController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/set/image', [SetImageController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->post('/set/unsplash', [SetImageController::class, 'unsplash']);
Route::middleware('auth:sanctum', 'owner')->post('/set/image/delete', [SetImageController::class, 'destroySetImage']);

//itemImage 
Route::get('/item/images/{imageid}', [ItemImageController::class, 'show']);
Route::get('/item/{itemid}/images', [ItemImageController::class, 'getImages']);

//itemImage - protected
Route::middleware('auth:sanctum', 'owner')->put('/item/image', [ItemImageController::class, 'update']);
Route::middleware('auth:sanctum', 'owner')->post('/item/image', [ItemImageController::class, 'store']);
Route::middleware('auth:sanctum', 'owner')->post('/item/image/unsplash', [ItemImageController::class, 'unsplash']);
Route::middleware('auth:sanctum', 'owner')->post('/item/image/delete', [ItemImageController::class, 'destroyItemImage']);

//settings
Route::get('/settings', [SettingController::class, 'index']);
Route::get('/settings/{setting}', [SettingController::class, 'show']);

//settings - protected
Route::middleware('auth:sanctum', 'admin:api')->post('/settings', [SettingController::class, 'store']);
Route::middleware('auth:sanctum', 'admin:api')->put('/settings', [SettingController::class, 'update']);

//feedback
Route::post('/feedback', [FeedbackController::class, 'store']);
Route::get('/feedback', [FeedbackController::class, 'index']);
Route::post('/delete/feedback', [FeedbackController::class, 'destroy']);

//reports
Route::post('/report', [ReportController::class, 'store']);

//reports - admin protected
Route::middleware('auth:sanctum', 'admin:api')->get('/reports', [ReportController::class, 'index']);
Route::middleware('auth:sanctum', 'admin:api')->get('/reports/{reportid}', [ReportController::class, 'show']);
Route::middleware('auth:sanctum', 'admin:api')->post('/delete/report', [ReportController::class, 'destroy']);
