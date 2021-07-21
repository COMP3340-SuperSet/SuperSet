<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Report extends Migration
{
    /**
     * Run the migrations.
     *  type refers to the type of resource being reported. 
     *      0 - User
     *      1 - Set
     *      2 - Item
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('reports');
        Schema::create('reports', function (Blueprint $table) {
            $table->integer('reportid', true, true);
            $table->tinyInteger('type', false, true);
            $table->integer('resourceid', false, true);
            $table->integer('reporterid', false, true)->nullable();
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
        Schema::dropIfExists('reports');
    }
}
