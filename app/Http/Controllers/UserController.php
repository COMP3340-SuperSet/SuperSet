<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        try{
            if($request->hasFile('image')){
                $imageid = (string) Str::uuid();
                error_log('image: '.$imageid.' user: '.$userid);
                Storage::disk('local')->put('images/'.$imageid, $request->file('image'));
                $user->update(['imageid'=>$imageid]);
                return $user;
            }else{
                return response()->json(['error'=>'Could not find attached file.'], 400);
            }
        }catch(Exception $e){
            error_log($e);
        }
    }

    public function destroy($userid)
    {
        return User::destroy($userid);
    }
}
