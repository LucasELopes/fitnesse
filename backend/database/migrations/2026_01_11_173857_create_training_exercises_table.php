<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('training_exercises', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->uuid('training_id');
        $table->uuid('exercise_id');
        $table->string('week_day');
        $table->integer('reps');
        $table->string('weight')->nullable();
        $table->timestamps();
        
        $table->foreign('training_id')->references('id')->on('trainings')->onDelete('cascade');
        $table->foreign('exercise_id')->references('id')->on('exercises')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_exercises');
    }
};
