<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function index()
    {
        return Report::all();
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'type' => 'required|integer',
            'resourceid' => 'required|integer',
        ]);

        $report = $request->all();

        /*todo: auth::check not working.

        if(Auth::check()){
            array_push($report, ['reporterid' => Auth::user()->userid]);
        }*/

        return Report::create($report);
    }

    public function show($reportid)
    {
        return Report::first($reportid);
    }

    public function destroy(Request $request)
    {
        return Report::destroy($request->reportid);
    }
}
