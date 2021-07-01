<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        return User::create($request->all());
    }

    public function show($userid)
    {
        return User::find($userid);
    }

    public function search($name)
    {
        return User::where('name', 'like', '%'.$name.'%')->get();
    }

    public function update(Request $request, $userid)
    {
        $user = User::first($userid);
        $user->update($request->all());
        return $user;
    }

    public function destroy($userid)
    {
        return User::destroy($userid);
    }
}
