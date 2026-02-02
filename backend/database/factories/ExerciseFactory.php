<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exercise>
 */
class ExerciseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'exercise_name' => $this->faker->words(2, true),
            'description' => $this->faker->words(10, true),
            'category' => $this->faker->randomElement(['peito', 'costas', 'ombro', 'biceps', 'triceps', 'perna']),
            'tutorial' => $this->faker->url(),
        ];
    }
}
