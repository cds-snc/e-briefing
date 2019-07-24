<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBinder;
use App\Binder;
use Illuminate\Http\Request;

class TripController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $binder = request()->user()->is_admin ? Binder::all() : request()->user()->binders;

        return view('trips.index', [
            'trips' => $binder
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('trips.create', [
            'trip' => new Binder()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreBinder|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBinder $request)
    {
        $binder = $request->user()->myTrips()->create([
            'name' => $request->name,
            'description' => $request->description
        ]);

        $binder->update([
          'code' => $binder->id
        ]);

        return redirect()->route('trips.days.index', $binder)->with('success', __('Trip created.  Now you may add Days, People, Articles and Documents to your Trip.'));
    }

    /**
     * Display the specified resource.
     *
     * @param Binder $binder
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function show(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('trips.edit', [
            'trip' => $binder
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Binder $binder
     * @return \Illuminate\Http\Response
     */
    public function edit(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('trips.edit', [
            'trip' => $binder
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreBinder|Request $request
     * @param Binder $binder
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function update(StoreBinder $request, Binder $binder)
    {
        $this->authorize('manage', $binder);

        $binder->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return redirect()->back()->with('success', __('Trip updated'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Binder $binder
     * @return \Illuminate\Http\Response
     */
    public function destroy(Binder $binder)
    {
        $this->authorize('manage', $binder);

        
    }
}
