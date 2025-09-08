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
        Schema::table('token_decks', function (Blueprint $table) {
            $table->string('oauth_access_token_id');
            $table->foreign('oauth_access_token_id')->references('id')->on('oauth_access_tokens')->onDelete('cascade'); // Add the foreign key constraint
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('token_decks', function (Blueprint $table) {
            //
        });
    }
};
