<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Exercise;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Training extends Model
{
    /** @use HasFactory<\Database\Factories\TrainingFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description'
    ];

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class, 'training_exercises')
            ->using(TrainingExercise::class) // <- aqui
            ->withPivot(['id','week_day','reps','weight'])
            ->withTimestamps();
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
