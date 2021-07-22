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
        if (!$itemid) return response()->json(['message' => 'Must include itemid as attribute in body.'], 400);
        if (!Item::find($itemid)) return response()->json(['message' => 'Item not found'], 404);

        try {
            if ($request->hasFile('image')) {
                $imageid = (string) Str::uuid();
                $path = Storage::disk('local')->put('images/items/' . $imageid, $request->file('image'));

                $extension = pathinfo($path, PATHINFO_EXTENSION);
                $directory = pathinfo($path, PATHINFO_DIRNAME);
                Storage::move($path, $directory . '/' . $imageid . '.' . $extension);

                return ItemImage::create([
                    'imageid' => $imageid,
                    'itemid' => $itemid
                ]);
            } else {
                return response()->json(['error' => 'Could not find attached file.'], 404);
            }
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
