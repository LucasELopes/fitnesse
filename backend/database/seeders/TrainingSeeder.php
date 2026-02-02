<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\Training;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrainingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        Training::factory(10)->create()->each(function ($training) {

        $exercises = Exercise::inRandomOrder()
            ->limit(rand(3, 6))
            ->get();

        foreach ($exercises as $exercise) {
            $training->exercises()->attach($exercise->id, [
                'reps' => rand(8, 15),
                'weight' => rand(0, 120),
                'week_day' => ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'][array_rand(['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'])],
            ]);
            }
        
        });

    }
}
