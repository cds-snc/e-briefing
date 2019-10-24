<?php

namespace App\Http\Controllers\Api;

use App\Binder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class BinderGetFileController extends Controller
{
    protected $storage_path;

    public function __invoke(Binder $binder)
    {
        if(!request()->file_path) {
            abort(404);
        }

        $this->storage_path = storage_path('app/public/packages/binders/' . $binder->id);

        $files = collect(Storage::disk('public')->allFiles('packages/binders/' . $binder->id));

        $new = $files->map(function ($item, $key) {
            $pattern = ['/packages\\/binders\\/[\d]+\\//'];
            return preg_replace($pattern, '', $item);
        });

        if(!$new->contains(request()->file_path)) {
            abort(404);
        };

        return response()->download($this->storage_path . '/' . request()->file_path);
    }
}