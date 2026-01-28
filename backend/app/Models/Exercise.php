<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Training;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Exercise extends Model
{
    /** @use HasFactory<\Database\Factories\ExerciseFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'exercise_name',
        'description',
        'tutorial'
    ];

    public function trainings(){
        return $this->belongsToMany(Training::class, 'training_exercises')->withPivot(['reps', 'weight']);
    }

    protected $keyType = 'string';
    public $incrementing = false;
    
    protected static function booted(){
        static::creating(function ($model) {
            if (! $model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
