<?php

namespace App\Http\Controllers;

use App\Models\Set;
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
        return Set::where('name', 'like', '%'.$name.'%')->get();
    }

    public function update(Request $request, $setid)
    {
        $set = Set::first($setid);
        $set->update($request->all());
        return $set;
    }

    public function destroy($setid)
    {
        return Set::destroy($setid);
    }
}
