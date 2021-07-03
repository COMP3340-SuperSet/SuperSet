<?php

namespace App\Http\Controllers;

use App\Models\ItemImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ItemImageController extends Controller
{
    public function index()
    {
        return ItemImage::all();
    }

    public function store(Request $request, $itemid)
    {
        try{
            if($request->hasFile('image')){
                $imageid = (string) Str::uuid();
                error_log('image: '.$imageid.' item: '.$itemid);
                Storage::disk('local')->put('images/items/'.$imageid, $request->file('image'));
                return ItemImage::create([
                    'imageid'=>$imageid,
                    'itemid'=>$itemid 
                ]);
            }else{
                return response()->json(['error'=>'Could not find attached file.'], 400);
            }
        }catch(Exception $e){
            error_log($e);
            return response()->json(['error'=>'Error uploading file.'], 500);
        }
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
