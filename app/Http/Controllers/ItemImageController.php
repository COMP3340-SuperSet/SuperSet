<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\ItemImage;

class ItemImageController extends Controller
{
    public function index()
    {
        return ItemImage::all();
    }

    public function store(Request $request)
    {
        return ItemImage::create($request->all());
    }

    public function show($imageid)
    {
        return ItemImage::find($imageid);
    }

    public function update(Request $request, $imageid)
    {
        $itemImage = ItemImage::find($imageid);
        $itemImage->update($request->all());
        return $itemImage;
    }

    public function destroy($imageid)
    {
        return ItemImage::destroy($imageid);
    }
}
