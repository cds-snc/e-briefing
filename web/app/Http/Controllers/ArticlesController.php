<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests\StoreArticle;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param Article $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        $this->authorize('manage', $article->binder);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Article $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        $this->authorize('manage', $article->binder);

        return view('binders.articles.edit', [
            'trip' => $article->binder,
            'article' => $article
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Article $article
     * @param StoreArticle|Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Article $article, StoreArticle $request)
    {
        $this->authorize('manage', $article->binder);

        $article->update([
            'title' => $request->title,
            'body' => $request->body,
            'is_protected' => $request->has('is_protected')
        ]);

        return redirect()->route('binders.articles.index', $article->binder)->with('success', 'Article saved!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Article $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        $this->authorize('manage', $article->binder);
        
        $article->delete();

        return redirect()->back()->with('success', 'Article deleted');
    }
}
