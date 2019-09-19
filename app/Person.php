<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $guarded = [];
    protected $appends = ['name', 'image_url', 'body_html'];
    protected $touches = ['binder'];

    public function binder()
    {
        return $this->belongsTo(Binder::class);
    }

    public function events()
    {
        return $this->belongsToMany(Event::class);
    }

    public function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getImageUrlAttribute()
    {
        return url($this->image);
    }

    public function getBodyHtmlAttribute()
    {
        return \Markdown::text($this->body);
    }
}
