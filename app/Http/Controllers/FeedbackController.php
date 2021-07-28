<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        return Feedback::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'rating' => 'required|integer',
            'contact' => 'boolean',
            'email' => 'string'
        ]);
        return Feedback::create($request->all());
    }

    public function show($feedbackid)
    {
        return Feedback::first($feedbackid);
    }

    public function destroy(Request $request)
    {
        return Feedback::destroy($request->feedbackid);
    }
}
