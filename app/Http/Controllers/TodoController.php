<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function index()
    {
        $todos = Todo::all();

        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $todo = Todo::create([
            'title' => $request->title,
        ]);

        return response()->json($todo);
    }

    public function update(Request $request)
    {
        $todo = Todo::find($request->id);
        
        $todo->update([
            'title' => $request->title,
            'is_completed' => $request->is_completed,
        ]);

        return response()->json($todo);
    }

    public function remove(Request $request)
    {
        $todo = Todo::find($request->id)->delete();

        return response()->json($todo);
    }
}
