<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Item;


class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->integer('itemid', true, true);
            $table->integer('setid', false, true);
            $table->foreign('setid')->references('setid')->on('sets');
            $table->string('name', 60);
            $table->string('description', 2048);
            $table->timestamps();
        });

        Item::create(['setid' => '1', 'name' => 'Test Item 1', 'description' => 'Sample Description for Test Item 1.']);
        Item::create(['setid' => '2', 'name' => 'Test Item 2', 'description' => 'Sample Description for Test Item 2.']);
        Item::create(['setid' => '2', 'name' => 'Test Item 3', 'description' => 'Sample Description for Test Item 3.']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
