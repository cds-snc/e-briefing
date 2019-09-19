<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    protected $guarded = [];
    protected $touches = ['binder'];

    public function binder()
    {
        return $this->belongsTo(Binder::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class)->orderBy('time_from');
    }
}
