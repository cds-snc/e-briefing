<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePerson;
use App\Person;
use Illuminate\Http\Request;

class PeopleController extends Controller
{

    public function edit(Person $person)
    {
        $this->authorize('manage', $person->binder);

        return view('binders.people.edit', compact(['binder', 'person']));
    }

    public function update(Person $person, StorePerson $request)
    {
        $this->authorize('manage', $person->binder);

        $person->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'title' => $request->title,
            'body' => $request->body
        ]);

        if($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->store('photos', 'public');

            $person->update([
                'image' => $filename
            ]);
        }

        return redirect()->route('binders.people.index', $person->binder)->with('success', 'Person saved!');
    }

    public function destroy(Person $person)
    {
        $this->authorize('manage', $person->binder);
        
        $person->delete();

        return redirect()->back()->with('success', 'Person deleted');
    }
}
