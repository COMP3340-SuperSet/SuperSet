<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => view('landing'));
Route::get('/login', fn () => view('login'))->name('login');
Route::get('/register', fn () => view('register'));
Route::get('/user', fn () => view('user'));
Route::get('/set', fn () => view('set'));
Route::get('/user/settings', fn () => view('settings'));
Route::get('/item', fn () => view('item'));
Route::middleware('auth:sanctum', 'admin:web')->get('/admin', fn () => view('admin'));
Route::get('/about', fn () => view('about'));
Route::get('/feedback', fn () => view('feedback'));
Route::middleware('auth:sanctum')->get('/edit', fn () => view('edit'));