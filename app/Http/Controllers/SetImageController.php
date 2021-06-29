<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SetImage;
use Illuminate\Support\Str;
use App\Console\ServerLogger;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Storage;

class SetImageController extends Controller
{
    public function index()
    {
        return SetImage::all();
    }

    public function store(Request $request, $setid)
    {   
        try{
            if($request->hasFile('image')){
            $imageid = (string) Str::uuid();
            error_log('image: '.$imageid.' set: '.$setid);
            Storage::disk('local')->put('images/'.$imageid, $request->file('image'));
            return SetImage::create([
                'imageid'=>$imageid,
                'setid'=>$setid 
            ]);
        }else{
            return response()->json(['error'=>'Could not find attached file.'], 400);
        }
        }catch(Exception $e){
            error_log($e);
        }
    }

    public function show($imageid)
    {
        return SetImage::find($imageid);
    }

    public function update(Request $request, $imageid)
    {
        $setImage = SetImage::find($imageid);
        $setImage->update($request->all());
        return $setImage;
    }

    public function destroy($imageid)
    {
        return SetImage::destroy($imageid);
    }

    
}
