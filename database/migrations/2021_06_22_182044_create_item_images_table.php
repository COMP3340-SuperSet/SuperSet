<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\ItemImage;

class CreateItemImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_images', function (Blueprint $table) {
            $table->string('imageid', 41)->nullable()->unique();
            $table->integer('itemid', false, true);
            $table->foreign('itemid')->references('itemid')->on('items')->onDelete('cascade');
            $table->timestamps();
        });

        ItemImage::create(['itemid' => '1', 'imageid' => '55a3c888-57e4-4834-af44-fa9a9b27e8b9.jpg']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_images');
    }
}
