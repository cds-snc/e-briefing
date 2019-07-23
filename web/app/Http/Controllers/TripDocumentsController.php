<?php

namespace App\Http\Controllers;

use App\Document;
use App\Http\Requests\StoreDocument;
use App\Binder;
use Illuminate\Http\Request;

class TripDocumentsController extends Controller
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
    public function index(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('trips.documents.index', [
            'trip' => $binder,
            'documentsByType' => $binder->documents->groupBy('document_type')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Binder $binder)
    {
        $this->authorize('manage', $binder);

        return view('trips.documents.create', [
            'trip' => $binder,
            'document' => new Document()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Binder $binder
     * @param StoreDocument|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Binder $binder, StoreDocument $request)
    {
        $this->authorize('manage', $binder);
        
        $file = $request->file('file');
        $filename = $file->store('documents', 'public');

        $binder->documents()->create([
            'name' => $request->name,
            'document_type' => $request->document_type,
            'file' => $filename,
            'is_protected' => $request->has('is_protected')
        ]);

        return redirect()->route('trips.documents.index', $binder)->with('success', 'Document uploaded!');
    }
}
