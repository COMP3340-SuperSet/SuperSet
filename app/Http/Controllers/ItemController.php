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
            'name' => 'required|string'
        ]);
        $properties = $request->all();
        if(!$properties['description']) $properties['description'] = '';
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
        $item = Item::find($request->itemid);

        if (!$item) {
            return response()->json(['message' => 'Item not found.'], 404);
        }

        return Item::destroy($item->itemid);
    }
}
