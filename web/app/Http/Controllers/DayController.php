<?php

namespace App\Http\Controllers;

use App\Day;
use App\Http\Requests\StoreDay;
use Illuminate\Http\Request;

class DayController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }

    public function edit(Day $day)
    {
        $this->authorize('manage', $day->binder);

        return view('binders.days.edit', [
            'day' => $day
        ]);
    }

    public function update(Day $day, StoreDay $request)
    {
        $this->authorize('manage', $day->binder);

        $day->update([
            'name' => $request->name,
            'date' => $request->date
        ]);

        return redirect()->route('binders.days.index', $day->binder);
    }

    public function destroy(Day $day)
    {
        $this->authorize('manage', $day->binder);
        
        $day->delete();

        return redirect()->route('binders.days.index', $day->binder)->with('success', 'Day deleted');
    }
}
