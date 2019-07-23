<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBinderCodeToBinders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('binders', function (Blueprint $table) {
            $table->string('code', 8)->after('id')->nullable();
        });

        $binders = \App\Binder::all();

        foreach ($binders as $binder) {
          $binder->update([
            'code' => hash('crc32', $binder->id)
          ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('binders', function (Blueprint $table) {
            //
        });
    }
}
