<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => view('landing'));
Route::get('/login', fn() => view('login'))->name('login');
Route::get('/register', fn() => view('register'));
Route::middleware('auth:sanctum')->get('/user', fn() => view('user'));
Route::get('/set', fn() => view('set'));
Route::get('/item', fn() => view('item'));
Route::get('/admin', fn() => view('admin'));
Route::get('/about', fn() => view('about'));
Route::get('/edit', fn() => view('edit'));

Route::middleware('auth:sanctum')->get('/auth', fn() => view('auth'));

Route::get('/hello', fn() => view('hello'));