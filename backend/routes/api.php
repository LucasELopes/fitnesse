<?php

use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\TrainingController;
use Illuminate\Support\Facades\Route;

Route::apiResource('trainings', TrainingController::class)->except('create', 'edit');
Route::apiResource('exercises', ExerciseController::class)->except('create', 'edit');

Route::post('trainings/{training}/exercises', [TrainingController::class, 'addExercise']);
Route::delete('trainings/{training}/exercises', [TrainingController::class, 'removeExercise']);

