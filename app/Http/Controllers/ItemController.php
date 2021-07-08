<?php

namespace App\Http\Controllers;

use App\Models\Item;
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

    public function update(Request $request, $itemid)
    {
        $item = Item::first($itemid);
        $item->update($request->all());
        return $item;
    }

    public function destroy(Request $request)
    {
        return Item::destroy($request->itemid);
    }
}
