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
            $table->foreign('userid')->references('userid')->on('users');
            $table->string('name', 60);
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Set::create(['userid' => '1', 'name' => 'Test Set 1', 'description' => 'Sample Description for Test Set 1.']);
        Set::create(['userid' => '2', 'name' => 'Test Set 2', 'description' => 'Sample Description for Test Set 2.']);
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
