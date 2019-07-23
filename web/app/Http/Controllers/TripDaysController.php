<?php

namespace App\Http\Controllers;


use App\Day;
use App\Http\Requests\StoreDay;
use App\Binder;

class TripDaysController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }

    public function index(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('trips.days.index', [
            'trip' => $binder,
            'days' => $binder->days()->orderBy('date')->get()
        ]);
    }

    public function create(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('trips.days.create', [
            'trip' => $binder,
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

        return redirect()->route('trips.days.index', $binder)->with('success', 'Day added!');
    }
}