<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExerciseRequest;
use Illuminate\Http\Request;
use App\Models\Exercise;

class ExerciseController extends Controller
{

    private Exercise $exercise;

    public function __construct(Exercise $exercise)
    {
        $this->exercise = $exercise;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $query = Exercise::query();

    if ($request->has('week_day')) {
        $query->where('week_day', $request->week_day);
    }

    return $query->get();
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(ExerciseRequest $request)
    {
        $exercise = $this->exercise->create($request->validated());

        return response()->json($exercise, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Exercise $exercise)
    {
        return response()->json($exercise->load('trainings')); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ExerciseRequest $request, Exercise $exercise)
    {
        $exercise->update($request->validated());

        return response()->json($exercise);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exercise $exercise)
    {
        $exercise->delete();

        return response()->json(null, 204);
    }
}
