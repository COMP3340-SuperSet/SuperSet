<?php

namespace App\Http\Controllers;

use App\Models\Item;

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
            'name' => 'required|string',
            'description' => 'string'
        ]);
        return Item::create($request->all());
    }

    public function show($itemid)
    {
        return Item::first($itemid);
    }

    public function update(Request $request)
    {
        $itemid = $request->itemid;
        $item = Item::find($itemid);
        $item->update($request->all());
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

    public function delete_image(Request $request)
    {
        $item = Item::find($request->itemid);
        //return response()->json(['item' => $item], 200);

        try {
            if ($item->imageid) {
                $imageid = $item->imageid;

                Storage::disk('local')->delete('public/items/' . $imageid);
                $item->update(['imageid' => null]);
                $item->save();
            }

            return response()->json(['item' => $item], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error deleting image.'], 500);
        }
    }

    public static function destroyItem(Request $request)
    {

        //TODO :: delete item images from file system

        $itemid = $request->itemid;
        error_log("error" . $request->itemid);
        //check if item exists
        $item = Item::find($itemid);

        if (!$item) {
            return response()->json(['message' => 'Item not found.'], 404);
        }

        //deleted item images array for detailed response
        $deletedImage = [];
        $imageid = $item->itemid;
        if ($imageid) {
            array_push($deletedImage, $imageid);
            $item->update(['imageid' => null]);
            Storage::disk('local')->delete('public/items/' . $imageid);
        }

        //destroy item
        $result = Item::destroy($itemid);

        //if item was successfully deleted / else
        if ($result) {
            return response()->json(['itemid' => $itemid, 'itemImages' => $deletedImage], 200);
        } else {
            return response()->json(['message' => 'Error when deleting item.'], 400);
        }
    }
}
