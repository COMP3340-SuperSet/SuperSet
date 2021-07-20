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

        $this->createTestData();
    }

    private function createTestData(){
        Item::create(['setid' => '1', 'name' => 'Bulbasaur', 'description' => 'Grass type leaf dino thing']);
        Item::create(['setid' => '1', 'name' => 'Charmander', 'description' => 'Fire type salamander']);
        Item::create(['setid' => '1', 'name' => 'Squirtle', 'description' => 'Water type turtle']);

        Item::create(['setid' => '2', 'name' => 'NVIDIA GeForce RTX 3080', 'description' => 'Graphics card']);
        Item::create(['setid' => '2', 'name' => 'Asus ROG Maximus XIII Hero', 'description' => 'Motherboard']);

        Item::create(['setid' => '3', 'name' => 'Eggs', 'description' => '6 large eggs']);
        Item::create(['setid' => '3', 'name' => 'Sugar', 'description' => '2 Cups']);
        Item::create(['setid' => '3', 'name' => 'Graham crackers', 'description' => '1 Cup']);

        Item::create(['setid' => '4', 'name' => 'Shorts', 'description' => 'Blue, cotton']);
        Item::create(['setid' => '4', 'name' => 'T-Shirt', 'description' => 'White, cotton']);

        Item::create(['setid' => '5', 'name' => 'Coat', 'description' => 'Fur coat']);
        Item::create(['setid' => '5', 'name' => 'Hat', 'description' => 'Pointy christmas kind']);

        Item::create(['setid' => '6', 'name' => 'Jeans', 'description' => 'Simple blue jeans']);
        Item::create(['setid' => '6', 'name' => 'Sweater', 'description' => 'White hoodie']);

        Item::create(['setid' => '7', 'name' => 'Some song name', 'description' => 'By some artist']);

        Item::create(['setid' => '8', 'name' => 'Dashcam', 'description' => 'Thinkware camera']);
        Item::create(['setid' => '8', 'name' => 'Decal', 'description' => 'Anime cat girl decal']);

        Item::create(['setid' => '9', 'name' => 'COMP2540 Notes', 'description' => 'Use your mathematical intuition']);
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
