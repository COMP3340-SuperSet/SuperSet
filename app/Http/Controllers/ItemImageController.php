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
                error_log('image: ' . $imageid . ' item: ' . $itemid);
                Storage::disk('local')->put('images/items/' . $imageid, $request->file('image'));
                return ItemImage::create([
                    'imageid' => $imageid,
                    'itemid' => $itemid
                ]);
            } else {
                return response()->json(['error' => 'Could not find attached file.'], 404);
            }
        } catch (Exception $e) {
            error_log($e);
            return response()->json(['error' => 'Error uploading file.'], 500);
        }
    }

    public function show(Request $request)
    {
        $imageid = $request->imageid;
        return ItemImage::find($imageid);
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

        ItemImage::destroy($imageid);
        return response()->json(['image' => $imageid], 200);
    }
}
