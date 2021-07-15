<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Set;
use App\Models\SetImage;
use App\Models\Item;
use App\Models\ItemImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

    public function search($term)
    {
        return User::where('username', 'like', '%' . $term . '%')->get();
    }

    public function update(Request $request)
    {
        $userid = $request->userid;
        $user = User::find($userid);
        $user->update($request->only(['name', 'bio']));
        $user->save();
        return response()->json(['user' => $user], 201);
    }

    public function getSets(Request $request, $userid)
    {
        $sets = Set::where('userid', '=', $userid)->get();
        return $sets;
    }

    public function update_image(Request $request)
    {
        $user = Auth::user();
        //return $request;
        error_log($request);

        try {
            if ($request->hasFile('image')) {
                $imageid = (string) Str::uuid();
                Storage::disk('local')->put('images/users/' . $imageid, $request->file('image'));
                $user->update(['imageid' => $imageid]);
                $user->save();
            } else {
                return response()->json(['error' => 'Could not find attached file.'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Error uploading file.'], 500);
            error_log($e);
        }
    }


    public static function destroyUser(Request $request)
    {

        //TODO:: delete user image from file system
        // and set imageid column to null for user

        $userid = $request->userid;

        $sets = Set::where('userid', '=', $userid)->get();
        foreach ($sets as $set) {
            return SetController::destroySet($set->setid);
        }

        return response()->json(['message' => 'deleting user...'], 500);
        //return User::destroy($userid);
    }
}
