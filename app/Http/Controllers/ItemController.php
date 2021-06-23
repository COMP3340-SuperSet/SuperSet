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
        
    }

    public function show($itemid)
    {
        return Item::find($itemid);
    }
    
    public function update(Request $request, $id)
    {
        
    }

    public function destroy($itemid)
    {
        return Item::destroy($itemid);
    }
}
