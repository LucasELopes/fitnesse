<?php

namespace Database\Factories;

use App\Models\Exercise;
use App\Models\Training;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Training>
 */
class TrainingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array{
        return [
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->paragraph(),
        ];
    }

}
