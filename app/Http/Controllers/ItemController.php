<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Exception;

class ItemController extends Controller
{

    public function index()
    {
        return Item::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string'
        ]);
        $properties = $request->all();
        if (!$properties['description']) $properties['description'] = '';
        $result = Item::create($properties);
        return $result;
    }

    public function show($itemid)
    {
        return Item::first($itemid);
    }

    public function update(Request $request)
    {
        error_log('------------------------------------- updating item: ' . json_encode($request->all()));
        $itemid = $request->itemid;
        $item = Item::find($itemid);
        $item->update($request->all());
        $item->save();
        return $item;
    }

    public function update_image(Request $request)
    {
        $item = Item::find($request->itemid);

        try {
            if ($request->hasFile('image')) {

                $imageid = (string) Str::uuid();
                $path = Storage::disk('local')->put('public/items', $request->file('image'));
                if ($path) {
                    Storage::disk('local')->delete('public/items/' . $item->imageid);
                } else {
                    return response()->json(['error' => 'Unable to update image.'], 500);
                }
                $extension = pathinfo($path, PATHINFO_EXTENSION);
                $directory = pathinfo($path, PATHINFO_DIRNAME);
                Storage::move($path, $directory . '/' . $imageid . '.' . $extension);

                $item->update(['imageid' => $imageid . '.' . $extension]);
                $item->save();
                return response()->json(['item' => $item], 200);
            } else {
                return response()->json(['error' => 'Could not find attached file.'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Error uploading file.'], 500);
        }
    }

    public static function destroyItem(Request $request)
    {

        //TODO :: delete item images from file system

        $itemid = $request->itemid;

        //check if item exists
        $item = Item::find($itemid);

        if (!$item) {
            return response()->json(['message' => 'Item not found.'], 404);
        }

        //get list of item images pointing to this item
        $itemImages = ItemImage::where('itemid', '=', $item->itemid)->get();

        //deleted item images array for detailed response
        $deletedImages = [];

        //delete all related itemImages
        foreach ($itemImages as $itemImage) {
            $request->replace(['imageid' => $itemImage->imageid]);

            $result = ItemImageController::destroyItemImage($request);
            array_push($deletedImages, [$itemImage->itemid, $result]);
        }

        //destroy item
        $result = Item::destroy($itemid);

        //if item was successfully deleted / else
        if ($result) {
            return response()->json(['itemid' => $itemid, 'itemImages' => $deletedImages], 200);
        } else {
            return response()->json(['message' => 'Error when deleting item.'], 400);
        }
    }
}
