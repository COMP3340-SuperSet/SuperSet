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
        return Set::create($request->all());
    }

    public function show($id)
    {
        return Set::find($id);
    }

    public function search($name)
    {
        return Set::where('name', 'like', '%'.$name.'%')->get();
    }

    public function update(Request $request, $id)
    {
        
    }

    public function destroy($setid)
    {
        return Set::destroy($setid);
    }
}
