<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrainingRequest;
use App\Http\Requests\UpdateTrainingRequest;
use App\Http\Requests\TrainingExerciseRequest;
use App\Models\Exercise;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TrainingController extends Controller
{

    private Training $training;

    public function __construct(Training $training){
        $this->training = $training;
    }

    public function addExercise(Request $request, Training $training)
    {
        $data = $request->validate([
            'exercise_id' => 'required|exists:exercises,id',
            'week_day' => 'required|string',
            'reps' => 'nullable|integer',
            'weight' => 'nullable|numeric',
        ]);

        $training->exercises()->attach($data['exercise_id'], [
            'week_day' => $data['week_day'],
            'reps' => $data['reps'],
            'weight' => $data['weight'],
        ]);

        return response()->json(['message' => 'Exercício adicionado com sucesso']);
    }


    public function removeExercise(Request $request, $trainingId)
    {
        $request->validate([
            'exercise_id' => 'required|uuid|exists:exercises,id',
            'week_day' => 'required|string'
        ]);

        $training = Training::findOrFail($trainingId);

        $training->exercises()->wherePivot('exercise_id', $request->exercise_id)
                              ->wherePivot('week_day', $request->week_day)
                              ->detach();

        return response()->json([
            'message' => 'Exercício removido com sucesso!'
        ]);
    }



    public function updateExercise(Request $request, Training $training, string $pivotId)
    {
        $data = $request->validate([
        'week_day' => 'required|string',
        'reps' => 'nullable|integer',
        'weight' => 'nullable|numeric',
        ]);

        $exercisePivot = DB::table('training_exercises')
            ->where('id', $pivotId)
            ->first();

        if (!$exercisePivot) {
            return response()->json(['message' => 'Exercício não encontrado'], 404);
        }

        DB::table('training_exercises')
            ->where('id', $pivotId)
            ->update($data);

        return response()->json(['message' => 'Exercício atualizado com sucesso']);
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
        return $training->load('exercises');
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
