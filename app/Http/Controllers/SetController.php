<?php

namespace App\Http\Controllers;

use App\Models\Set;
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
        $setid = $request->setid;
        //TODO:: delete all set images ids  from table 
        $items = Item::where('setid', '=', $setid)->get();

        $deletedImages = [];

        foreach ($items as $item) {
            $item->destroy($item->itemid);
        }
    }
}
