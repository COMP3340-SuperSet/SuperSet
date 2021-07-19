<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemImage;
use Illuminate\Http\Request;

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
        $item = Item::first($itemid);
        $item->update($request->all());
        return $item;
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
        $itemImages = ItemImage::where('itemid', '=', $itemid)->get();

        //deleted item images array for detailed response
        $deletedImages = [];

        //delete all related itemImages
        foreach ($itemImages as $itemImage) {
            $result = ItemImageController::destroyItemImage($itemImage);
            array_push($deletedImages, [$itemImage->itemid, $result]);
        }

        //destroy item
        $result = Item::destroy($itemid);

        //if item was successfully deleted / else
        if ($result) {
            return response()->json(['item' => $itemid, 'itemImages' => $deletedImages], 200);
        } else {
            return response()->json(['message' => 'Error when deleting item.'], 400);
        }
    }
}
