<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrainingRequest;
use App\Http\Requests\UpdateTrainingRequest;
use App\Http\Requests\TrainingExerciseRequest;
use App\Models\Exercise;
use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{

    private Training $training;

    public function __construct(Training $training){
        $this->training = $training;
    }

    public function addExercise(Training $training, TrainingExerciseRequest $request){
        $training->exercises()->syncWithoutDetaching([$request->exercise_id => [
            'reps' => $request->reps,
            'weight' => $request->weight,
        ]
    ]);

        return response()->json(['message' => 'Exercício vinculado ao treino.']);
    }

    public function removeExercise(Training $training, Exercise $exercise){
        $training->exercises()->detach($exercise->id);

        return response()->json([
            'message' => 'Exercício removido do treino com sucesso.'
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->training->with('exercises')->get();
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainingRequest $request)
    {
        $training = $this->training->create($request->validated());

        return response()->json($training, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Training $training)
    {
        return response()->json($training->load('exercises'));
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainingRequest $request, Training $training)
    {
        $training->update($request->validated());

        return response()->json($training);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Training $training)
    {
        $training->delete();

        return response()->json(null, 204);
    }
}
