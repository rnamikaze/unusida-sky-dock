<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attempt_logs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Add the foreign key constraint

            $table->unsignedBigInteger('token_id');
            $table->foreign('token_id')->references('id')->on('token_decks')->onDelete('cascade'); // Add the foreign key constraint

            $table->string('action', 50)->default('allowed')->nullable();
            $table->string('event', 50)->default('initiate')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attempt_logs');
    }
};
