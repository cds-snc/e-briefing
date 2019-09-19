<?php

namespace App\Http\Controllers;


use App\Day;
use App\Http\Requests\StoreDay;
use App\Binder;

class BinderDaysController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }

    public function index(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('binders.days.index', [
            'binder' => $binder,
            'days' => $binder->days()->orderBy('date')->get()
        ]);
    }

    public function create(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('binders.days.create', [
            'binder' => $binder,
            'day' => new Day()
        ]);
    }

    public function store(Binder $binder, StoreDay $request)
    {
        $this->authorize('manage', $binder);
        
        $binder->days()->create([
            'name' => $request->name,
            'date' => $request->date
        ]);

        return redirect()->route('binders.days.index', $binder)->with('success', 'Day added!');
    }
}