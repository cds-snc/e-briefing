<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function myBinders()
    {
        return $this->hasMany(Binder::class, 'created_by_id');
    }

    public function otherBinders()
    {
        return $this->belongsToMany(Binder::class);
    }

    public function getBindersAttribute()
    {
        return $this->myBinders->merge($this->otherBinders);
    }
}
