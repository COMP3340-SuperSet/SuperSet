<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('users');
        Schema::create('users', function (Blueprint $table) {
            $table->integer('userid', true, true);
            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('name', 32);
            $table->string('bio')->nullable();
            $table->string('imageid', 32)->nullable()->unique();
            $table->integer('role', false, true)->default('0');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
        User::create(['email'=>'admin@ss.ca', 'name'=>'Admin', 'username'=>'admin', 'password'=>'password', 'password_confirmation'=>'password']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
