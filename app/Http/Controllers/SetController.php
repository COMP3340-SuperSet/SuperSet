<?php

namespace App\Http\Controllers;

use App\Models\Set;
use App\Models\SetImage;
use App\Models\Item;
use Illuminate\Http\Request;

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
        $setImages = SetImage::where('setid', '=', $setid)->get();

        $deletedImages = [];

        foreach ($setImages as $setImage) {
            $request->replace(['imageid' => $setImage->imageid]);

            $result = SetImageController::destroySetImage($request);
            array_push($deletedImages, [$setImage->setid, $result]);
        }

        //delete the set
        $result = Set::destroy($setid);

        //if set was successfully deleted / else
        if ($result) {
            return response()->json(['set' => $setid, 'setImage' => $deletedImages], 200);
        } else {
            return response()->json(['message' => 'Error when deleting set.'], 400);
        }
    }
}
