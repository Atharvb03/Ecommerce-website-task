<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration { public function up(): void { Schema::create('products', function (Blueprint $table) { $table->id(); $table->foreignId('user_id')->constrained()->cascadeOnDelete(); $table->string('title'); $table->text('description'); $table->decimal('price', 12, 2); $table->string('category'); $table->string('image_url', 2048)->nullable(); $table->string('gender', 20)->nullable(); $table->string('volume', 30)->nullable(); $table->boolean('is_new_arrival')->default(true); $table->boolean('is_best_seller')->default(false); $table->decimal('rating', 2, 1)->default(5); $table->timestamps(); $table->index(['category', 'gender']); }); } public function down(): void { Schema::dropIfExists('products'); } };
