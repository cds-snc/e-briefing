<?php

namespace App\Http\Controllers\Api;

use App\Binder;
use App\BinderPackage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class BinderFileListController extends Controller
{
    protected $storage_path;
    private $package;

    public function __construct(BinderPackage $package)
    {
        $this->package = $package;
    }

    public function __invoke(Binder $binder)
    {
        ini_set('max_execution_time', 60);
        $this->storage_path = storage_path('app/public/packages/binders/' . $binder->id);

        $this->package->generate($binder);

        $files = collect(Storage::disk('public')->allFiles('packages/binders/' . $binder->id));

        $new = $files->map(function ($item, $key) {
            $pattern = ['/packages\\/binders\\/[\d]+\\//'];
            return preg_replace($pattern, '', $item);
        });

        return $new;
    }
}

/* example out
 * [
  "articles.json",
  "assets/documents/BHyOmbsPanDeksWj4mkLVQenVpuTWcdUgrh4TSbe.pdf",
  "assets/documents/TYsCsmMmdQ2azIeZbbBSJwztG3LQoImyluieVSFH.pdf",
  "assets/photos/Mwmc7ZSmBdF4Q79TQr9ruY7FqfPgu2ACRy9oSn01.jpeg",
  "assets/photos/YQHfTajk5f2QjoxMRQSbEYul38tNr4MivhZ8gIHf.jpeg",
  "binder.json",
  "days.json",
  "documents.json",
  "documents/1.json",
  "documents/2.json",
  "package.zip",
  "people.json",
  "people/1.json",
  "people/2.json"
]
 */
