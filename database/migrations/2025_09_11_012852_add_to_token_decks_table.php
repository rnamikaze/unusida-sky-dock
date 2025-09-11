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
            $table->string('special_id', 64)->unique();
            $table->string('issuer', 64)->after('app_name');
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
