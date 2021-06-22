<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSetImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('set_images', function (Blueprint $table) {
            $table->integer('imageid', false, true)->unique();
            $table->integer('setid', false, true);
            $table->foreign('setid')->references('setid')->on('sets');
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
        Schema::dropIfExists('set_images');
    }
}
