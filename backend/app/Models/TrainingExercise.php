<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TrainingExercise extends Pivot
{
    /** @use HasFactory<\Database\Factories\TrainingExerciseFactory> */
    use HasFactory, HasUuids;

    protected $table = 'training_exercises';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'exercise_id',
        'training_id',
        'week_day',
        'reps',
        'weight'
    ];

    public function training(){
        return $this->belongsTo(Training::class);
    }

    public function exercise(){
        return $this->belongsTo(Exercise::class);    
    }

    protected static function booted()
    {
        static::creating(function ($pivot) {
            if (!$pivot->id) {
                $pivot->id = (string) Str::uuid();
            }
        });
    }
}
