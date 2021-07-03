<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public static function index()
    {
        return Setting::all();
    }

    public static function store(Request $request)
    {
        return Setting::create($request->all());
    }

    public static function show($setting)
    {
        return Setting::find($setting);
    }

    public function update(Request $request)
    {
        $updated = Setting::where($request->get($request->setting))->update($request->all());
        if($updated) 
            return response()->json(['message'=>'Setting updated successfully'], 200);
        else
            return response()->json(['message'=>'Unable to update setting.'], 500);
        
    }

    public static function destroy($setting)
    {
        return Setting::destroy($setting);
    }
}
