<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests\StoreArticle;
use App\Binder;
use Illuminate\Http\Request;

class BinderArticlesController extends Controller
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

        return view('binders.articles.index', [
            'binder' => $binder,
            'articles' => $binder->articles
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

        return view('binders.articles.create', [
            'binder' => $binder,
            'article' => new Article()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Binder $binder
     * @param StoreArticle|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Binder $binder, StoreArticle $request)
    {
        $this->authorize('manage', $binder);
        
        $binder->articles()->create([
            'title' => $request->title,
            'body' => $request->body,
            'is_protected' => $request->has('is_protected')
        ]);

        return redirect()->route('binders.articles.index', $binder)->with('success', 'Article saved!');
    }
}
