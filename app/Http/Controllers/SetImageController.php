<?php

namespace App\Http\Controllers;

use App\Models\SetImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Storage;

class SetImageController extends Controller
{
    public function index()
    {
        return SetImage::all();
    }

    public function store(Request $request)
    {
        $setid = $request->setid;
        error_log('HERE: ' . json_encode($request->all()));
        try {
            if ($request->hasFile('image')) {

                $imageid = (string) Str::uuid();
                $path = Storage::disk('local')->put('public/sets', $request->file('image'));
                $extension = pathinfo($path, PATHINFO_EXTENSION);
                $directory = pathinfo($path, PATHINFO_DIRNAME);

                Storage::disk('local')->move($path, $directory . '/' . $imageid . '.' . $extension);

                return SetImage::create([
                    'imageid' => $imageid . '.' . $extension,
                    'setid' => $setid
                ]);
            } else {
                return response()->json(['error' => 'Could not find attached file.'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Error uploading file.'], 500);
        }
    }

    public function unsplash(Request $request)
    {
        $setid = $request->setid;
        try {
            //Context required for file_get_contents()
            $opts = array('http' => array('header' => "User-Agent:MyAgent/1.0\r\n"));
            $context = stream_context_create($opts);
            $file = file_get_contents($request->download, false, $context);
            error_log('HERE: ' . json_encode($request->all()));
            error_log('HERE: ' . json_encode($request->all()));
            //generate imageid
            $imageid = (string) Str::uuid();
            $filename =  $imageid . '.jpg';

            //store image
            $path = Storage::disk('local')->put('public/sets/' . $filename, $file);

            //create entry
            return SetImage::create([
                'imageid' => $filename,
                'setid' => $setid
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error uploading file.'], 500);
        }
    }


    public function show($imageid)
    {
        return SetImage::find($imageid);
    }

    public function update(Request $request)
    {
        //TODO:: delete old file before updating.

        $imageid = $request->imageid;
        $setImage = SetImage::find($imageid);
        $setImage->update($request->all());
        return $setImage;
    }

    public function getImages($setid)
    {
        return SetImage::where('setid', '=', $setid)->get();
    }

    public static function destroySetImage(Request $request)
    {
        $imageid = $request->imageid;
        if (!$imageid) return response()->json(['message' => 'Image not found'], 404);

        Storage::disk('local')->delete('images/sets/' . $imageid);
        SetImage::destroy($imageid);
        return response()->json(['image' => $imageid], 200);
    }
}
