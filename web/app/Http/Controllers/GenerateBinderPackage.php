<?php

namespace App\Http\Controllers;

use App\Article;
use App\Day;
use App\Document;
use App\Event;
use App\BinderPackage;
use App\Person;
use App\Binder;
use Carbon\Carbon;
use Chumper\Zipper\Facades\Zipper;
use Illuminate\Support\Facades\Storage;

class GenerateBinderPackage extends Controller
{
    /**
     * @var BinderPackage
     */
    private $package;

    public function __construct(BinderPackage $package)
    {
        $this->package = $package;
    }

    public function __invoke(Binder $binder)
    {
        ini_set('max_execution_time', 60);

        $package = $this->package->generate($binder);

        return response()->download($package);

        // return redirect()->back()->with('success', 'Package Generated.  You can now sync the data to device by using the link in the app.');
    }
}
