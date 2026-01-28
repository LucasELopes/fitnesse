<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TrainingExercise extends Pivot
{
    /** @use HasFactory<\Database\Factories\TrainingExerciseFactory> */
    use HasFactory;

    public $timestamps = false;
    protected $table = 'training_exercises';
    
    protected $fillable = [
        'exercise_id',
        'training_id',
        'reps',
        'weight'
    ];

    public function training(){
        return $this->belongsTo(Training::class);
    }

    public function exercise(){
        return $this->belongsTo(Exercise::class);    }
}
