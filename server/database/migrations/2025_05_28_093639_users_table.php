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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('master_id')->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('faculty')->nullable();
            $table->string('field_study')->nullable();
            $table->string('position')->nullable();
            $table->string('position_work')->nullable();
            $table->string('register_status')->default(0);
            $table->string('role')->default('user');
            $table->string('img_name')->nullable();
            $table->string('img_path')->nullable();
            $table->timestamps();
            $table->softDeletes(); // เพิ่มคอลัมน์ deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
