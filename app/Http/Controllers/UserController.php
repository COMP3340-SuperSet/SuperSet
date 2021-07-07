<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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

    public function search($name)
    {
        return User::where('name', 'like', '%'.$name.'%')->get();
    }

    public function update(Request $request, $userid)
    {
        $user = User::first($userid);
        $user->update($request->only(['name', 'bio']));
        return $user;   
    }

    public function update_image(Request $request, $userid)
    {   
        //return $request;
        error_log($request);

        try{
            $user = User::find($userid);
            if($request->hasFile('image')){
                $imageid = (string) Str::uuid();
                Storage::disk('local')->put('images/users/'.$imageid, $request->file('image'));
                $user->update(['imageid'=>$imageid]);
                $user->save();
            }else{
                return response()->json(['error'=>'Could not find attached file.'], 400);
            }
        }catch(Exception $e){
            return response()->json(['error'=>'Error uploading file.'], 500);
            error_log($e);
        }
    }

    public function destroy($userid)
    {
        return User::destroy($userid);
    }

    public function getRole($userid){
        return User::select('role')->find($userid);
    }
}
