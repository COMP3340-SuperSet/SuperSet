<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Feedback extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('feedback');
        Schema::create('feedback', function (Blueprint $table) {
            $table->integer('feedbackid', true, true);
            $table->string('email', 254);
            $table->boolean('contact');
            $table->string('content', 2560);
            $table->tinyInteger('rating', false, true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('feedback');
    }
}
