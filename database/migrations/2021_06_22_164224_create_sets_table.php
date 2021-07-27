<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Set;


class CreateSetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('sets');
        Schema::create('sets', function (Blueprint $table) {
            $table->integer('setid', true, true);
            $table->integer('userid', false, true);
            $table->foreign('userid')->references('userid')->on('users')->onDelete('cascade');
            $table->string('name', 60);
            $table->string('description', 2048)->nullable();
            $table->timestamps();
        });

        $this->createTestData();
    }

    private function createTestData(){
        Set::create(['userid' => '1', 'name' => 'Pokemon Cards', 'description' => 'Here is a bunch of pokemon cards']);
        Set::create(['userid' => '1', 'name' => 'PC Build', 'description' => 'Sick gaming PC build']);
        Set::create(['userid' => '1', 'name' => 'Cheescake', 'description' => 'Recipe for classic cheesecake']);
        
        
        Set::create(['userid' => '2', 'name' => 'Summer wardrobe', 'description' => 'What I wear during summer']);
        Set::create(['userid' => '2', 'name' => 'Winter wardrobe', 'description' => 'What I wear during winter']);
        Set::create(['userid' => '2', 'name' => 'Fall wardrobe', 'description' => 'What I wear during Fall']);

        Set::create(['userid' => '3', 'name' => 'Top 10 Songs', 'description' => 'Best songs ever made ever']);

        Set::create(['userid' => '4', 'name' => 'Car Accessories', 'description' => 'The gadgets in my car']);
        Set::create(['userid' => '4', 'name' => 'School notes', 'description' => 'Collection of notes or something']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sets');
    }
}
