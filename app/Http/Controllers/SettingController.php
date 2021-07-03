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
        $setting = Setting::find($request->get('setting'));
        $setting->update($request->all());
        $setting->save();
        return $setting;

    }

    public static function destroy($setting)
    {
        return Setting::destroy($setting);
    }
}
