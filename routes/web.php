<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn() => view('landing'));
Route::get('/login', fn() => view('login'));
Route::get('/register', fn() => view('register'));
Route::get('/user', fn() => view('user'));
Route::get('/set', fn() => view('set'));
Route::get('/item', fn() => view('item'));
Route::get('/admin', fn() => view('admin'));
