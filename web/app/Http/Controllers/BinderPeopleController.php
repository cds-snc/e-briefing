<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePerson;
use App\Person;
use App\Binder;
use Illuminate\Http\Request;

class BinderPeopleController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Binder $binder
     * @return \Illuminate\Http\Response
     */
    public function index(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('binders.people.index', [
            'binder' => $binder,
            'people' => $binder->people
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Binder $binder
     * @return \Illuminate\Http\Response
     */
    public function create(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('binders.people.create', [
            'binder' => $binder,
            'person' => new Person()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Binder $binder
     * @param StorePerson|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Binder $binder, StorePerson $request)
    {
        $this->authorize('manage', $binder);
        
        $person = $binder->people()->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'title' => $request->title,
            'body' => $request->body
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->store('photos', 'public');

            $person->update([
                'image' => $filename
            ]);
        }

        return redirect()->route('binders.people.index', $binder)->with('success', 'Person saved!');
    }
}
