<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\SetImage;


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
            $table->string('imageid', 41)->unique();
            $table->integer('setid', false, true);
            $table->foreign('setid')->references('setid')->on('sets');
            $table->timestamps();
        });

        SetImage::create(['setid' => '1', 'imageid' => '44926229-0fe5-4262-bcd1-d4bfe20348cb.webp']);
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
