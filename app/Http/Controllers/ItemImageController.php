<?php

namespace App\Http\Controllers;

use App\Models\ItemImage;
use App\Models\Item;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ItemImageController extends Controller
{
    public function index()
    {
        return ItemImage::all();
    }

    public function store(Request $request)
    {
        $itemid = $request->itemid;
        error_log('HERE: ' . json_encode($request->all()));
        try {
            if ($request->hasFile('image')) {

                $imageid = (string) Str::uuid();
                $path = Storage::disk('local')->put('public/items', $request->file('image'));
                $extension = pathinfo($path, PATHINFO_EXTENSION);
                $directory = pathinfo($path, PATHINFO_DIRNAME);

                Storage::disk('local')->move($path, $directory . '/' . $imageid . '.' . $extension);

                return ItemImage::create([
                    'imageid' => $imageid . '.' . $extension,
                    'itemid' => $itemid
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
        $itemid = $request->itemid;
        try {
            //Context required for file_get_contents()
            $opts = array('http' => array('header' => "User-Agent:MyAgent/1.0\r\n"));
            $context = stream_context_create($opts);
            $file = file_get_contents($request->download, false, $context);
            error_log('HERE: ' . json_encode($request->all()));
            //generate imageid
            $imageid = (string) Str::uuid();
            $filename =  $imageid . '.jpg';

            //store image
            $path = Storage::disk('local')->put('public/items/' . $filename, $file);

            //create entry
            return ItemImage::create([
                'imageid' => $filename,
                'itemid' => $itemid
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error uploading file.'], 500);
        }
    }

    public function show(Request $request)
    {
        $imageid = $request->imageid;
        return ItemImage::find($imageid);
    }

    public function getImages($itemid)
    {
        return ItemImage::where('itemid', '=', $itemid)->get();
    }

    public function update(Request $request)
    {
        $imageid = $request->imageid;
        //TODO:: delete old file before updating.
        $itemImage = ItemImage::find($imageid);
        $itemImage->update($request->all());
        return $itemImage;
    }

    public static function destroyItemImage(Request $request)
    {
        $imageid = $request->imageid;
        if (!$imageid) return response()->json(['message' => 'Image not found'], 404);

        Storage::disk('local')->delete('images/items/' . $imageid);
        ItemImage::destroy($imageid);
        return response()->json(['image' => $imageid], 200);
    }
}
