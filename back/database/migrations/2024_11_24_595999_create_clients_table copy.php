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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('person');
            $table->string('company');
            $table->boolean('lead')->default(false);
            $table->text('comment')->nullable();
            $table->json('tag_names')->nullable();
            $table->boolean('important')->default(false);
            $table->string('currency')->nullable();
            $table->integer('agreements_count')->default(0);
            $table->string('position')->nullable();
            $table->boolean('archived')->default(false);
            $table->json('tags')->nullable();
            $table->json('emails')->nullable();
            $table->json('phones')->nullable();
            $table->decimal('paid_amount', 10, 2)->default(0);
            $table->decimal('credit_amount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->decimal('balance_amount', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
