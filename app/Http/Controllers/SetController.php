<?php

namespace App\Http\Controllers;

use App\Models\Set;
use App\Models\Item;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SetController extends Controller
{
    public function index()
    {
        return Set::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'string'
        ]);
        return Set::create($request->all());
    }

    public function show($setid)
    {
        return Set::find($setid);
    }

    public function search($name)
    {
        return Set::where('name', 'like', '%' . $name . '%')->get();
    }

    public function update(Request $request)
    {
        $setid = $request->setid;
        $set = Set::first($setid);
        $set->update($request->all());
        return $set;
    }

    public function getUserSets($userid)
    {
        return Set::where('userid', '=', $userid)->get();
    }

    public function getItems(Request $request, $setid)
    {
        return Item::where('setid', '=', $setid)->get();
    }

    public function update_image(Request $request)
    {
        $set = Set::find($request->setid);

        try {
            if ($request->hasFile('image')) {

                $imageid = (string) Str::uuid();
                $path = Storage::disk('local')->put('public/sets', $request->file('image'));
                if ($path) {
                    Storage::disk('local')->delete('public/sets/' . $set->imageid);
                } else {
                    return response()->json(['error' => 'Unable to update image.'], 500);
                }
                $extension = pathinfo($path, PATHINFO_EXTENSION);
                $directory = pathinfo($path, PATHINFO_DIRNAME);
                Storage::move($path, $directory . '/' . $imageid . '.' . $extension);

                $set->update(['imageid' => $imageid . '.' . $extension]);
                $set->save();
                return response()->json(['set' => $set], 200);
            } else {
                return response()->json(['error' => 'Could not find attached file.'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Error uploading file.'], 500);
        }
    }

    public function delete_image(Request $request)
    {
        $set = Set::find($request->setid);
        //return response()->json(['set' => $set], 200);

        try {
            if ($set->imageid) {
                $imageid = $set->imageid;

                Storage::disk('local')->delete('public/sets/' . $imageid);
                $set->update(['imageid' => null]);
                $set->save();
            }

            return response()->json(['set' => $set], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error deleting image.'], 500);
        }
    }

    public static function destroySet(Request $request)
    {

        //TODO :: delete set images from file system
        $setid = $request->setid;

        //check if set exists
        $set = Set::find($setid);
        if (!$set) {
            return response()->json(['message' => 'Set not found.'], 404);
        }

        //get list of items pointing to this set
        $items = Item::where('setid', '=', $setid)->get();

        //delete all items associated with the set
        foreach ($items as $item) {
            $request->replace(['itemid' => $item->itemid]); //add item ids to the request
            ItemController::destroyItem($request);
        }

        //get the image for that set
        $deletedImage = [];
        $imageid = $set->imageid;
        if ($imageid) {
            array_push($deletedImage, $imageid);
            $set->update(['imageid' => null]);
            Storage::disk('local')->delete('public/sets/' . $imageid);
        }


        //delete the set
        $result = Set::destroy($setid);

        //if set was successfully deleted / else
        if ($result) {
            return response()->json(['set' => $setid, 'setImage' => $deletedImage], 200);
        } else {
            return response()->json(['message' => 'Error when deleting set.'], 400);
        }
    }
}
