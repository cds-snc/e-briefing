<?php

namespace App\Http\Controllers;

use App\Document;
use App\Http\Requests\StoreDocument;
use App\Binder;
use Illuminate\Http\Request;

class BinderDocumentsController extends Controller
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

        return view('binders.documents.index', [
            'binder' => $binder,
            'documentsByType' => $binder->documents->groupBy('document_type')
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

        return view('binders.documents.create', [
            'binder' => $binder,
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

        return redirect()->route('binders.documents.index', $binder)->with('success', 'Document uploaded!');
    }
}
