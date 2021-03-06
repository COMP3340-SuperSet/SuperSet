<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Set;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchUsers($term)
    {
        return User::where('username', 'like', '%'.$term.'%')->get();
    }

    public function searchSets($term)
    {
        return Set::where('name', 'like', '%'.$term.'%')->get();
    }

    public function search($term)
    {
        $users = User::where('username', 'like', '%'.$term.'%')->get();
        $sets =  Set::where('name', 'like', '%'.$term.'%')->get();

        foreach($users as $user){
            $user->title = $user->username;
        }

        foreach($sets as $set){
            $set->title = $set->name;
        }

        return [
            "users" => [
                "name" => "Users",
                "results" => $users
            ],
            "sets" => [
                "name" => "Sets",
                "results" => $sets
            ],
        ];
    }
}