<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;

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
            $table->string('password');
            $table->string('username', 32)->unique();
            $table->string('bio')->nullable();
            $table->string('imageid', 41)->nullable()->unique();
            $table->integer('role', false, true)->default('0');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        $this->createTestData();
    }

    private function createTestData()
    {
        User::create(['email' => 'admin@ss.ca', 'username' => 'admin', 'password' => Hash::make('password'), 'password_confirmation' => 'password']);
        User::create(['email' => 'stephen@stephen.com', 'username' => 'user', 'password' => Hash::make('password'), 'password_confirmation' => 'password']);
        User::create(['email' => 'user@ss.ca', 'username' => 'user1', 'password' => Hash::make('password'), 'password_confirmation' => 'password']);
        User::create(['email' => 'another@ss.ca', 'username' => 'anotherUser', 'password' => Hash::make('password'), 'password_confirmation' => 'password']);
        User::create(['email' => 'tim@ss.ca', 'username' => 'Timothy', 'password' => Hash::make('password'), 'password_confirmation' => 'password']);
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
