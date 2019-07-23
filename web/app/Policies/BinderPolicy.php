<?php

namespace App\Policies;

use App\Binder;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BinderPolicy
{
    use HandlesAuthorization;

    public function manage(User $user, Binder $binder)
    {
        if ($user->is_admin) {
            return true;
        }

        return $user->id == $binder->creator->id || $binder->collaborators->pluck('id')->contains($user->id);
    }
}
