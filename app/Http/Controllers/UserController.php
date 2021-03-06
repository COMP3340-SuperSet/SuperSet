<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Set;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
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
        $user->update($request->only(['username', 'bio']));
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
        $user = User::find($request->userid);

        try {
            if ($request->hasFile('image')) {
                $imageid = (string) Str::uuid();
                $path = Storage::disk('local')->put('public/users', $request->file('image'));
                if ($path) {
                    Storage::disk('local')->delete('public/users/' . $user->imageid);
                } else {
                    return response()->json(['error' => 'Unable to update image.'], 500);
                }
                $extension = pathinfo($path, PATHINFO_EXTENSION);
                $directory = pathinfo($path, PATHINFO_DIRNAME);
                Storage::move($path, $directory . '/' . $imageid . '.' . $extension);

                $user->update(['imageid' => $imageid . '.' . $extension]);
                $user->save();
                return response()->json(['user' => $user], 200);
            } else {
                return response()->json(['error' => 'Could not find attached file.'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Error uploading file.'], 500);
        }
    }

    public function delete_image(Request $request)
    {
        $user = User::find($request->userid);
        //return response()->json(['user' => $user], 200);

        try {
            if ($user->imageid) {
                $imageid = $user->imageid;

                Storage::disk('local')->delete('public/users/' . $imageid);
                $user->update(['imageid' => null]);
                $user->save();
            }

            return response()->json(['user' => $user], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error deleting image.'], 500);
        }
    }

    public static function destroyUser(Request $request)
    {

        $userid = $request->userid;
        $banUser = $request->banUser;

        $user = User::find($userid);
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        //get list of sets pointing to the user
        $sets = Set::where('userid', '=', $userid)->get();

        //delete all sets associated with the user
        foreach ($sets as $set) {
            $request->replace(['setid' => $set->setid]);
            SetController::destroySet($request);
        }

        //set imageid to null
        $deletedImage = [];
        $imageid = $user->imageid;
        if ($imageid) {
            array_push($deletedImage, $imageid);
            $user->update(['imageid' => null]);
            Storage::disk('local')->delete('public/users/' . $imageid);
        }

        //ban or delete the user
        if ($banUser) {
            $user->update(['role' => 3]);
            return response()->json(['message' => 'user ' . $user->username . ' was banned.', 'userImage' => $deletedImage, 'role' => $user->role], 200);
        } else {
            //ban the user
            $result = User::destroy($userid);
        }

        //if user was successfully deleted / else
        if ($result) {
            return response()->json(['user' => $userid, 'userImage' => $deletedImage], 200);
        } else {
            return response()->json(['message' => 'Error when deleting User.'], 400);
        }
    }

    public function testPassword(Request $request)
    {
        $credentials = $request->only('userid', 'password');

        if (User::attempt($credentials)) {
            return response()->json(['result' => true], 200);
        } else {
            return response()->json(['result' => false], 200);
        }
    }
}
