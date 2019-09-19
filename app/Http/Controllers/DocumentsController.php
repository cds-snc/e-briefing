<?php

namespace App\Http\Controllers;

use App\Document;
use Illuminate\Http\Request;

class DocumentsController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     *
     * @param Document $document
     * @return \Illuminate\Http\Response
     */
    public function edit(Document $document)
    {
        $this->authorize('manage', $document->binder);

        return view('binders.documents.edit', [
            'binder' => $document->binder,
            'document' => $document
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Document $document
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function update(Document $document, Request $request)
    {
        $this->authorize('manage', $document->binder);

        $document->update([
            'name' => $request->name,
            'document_type' => $request->document_type,
            'is_protected' => $request->has('is_protected')
        ]);

        if($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = $file->store('documents', 'public');

            $document->update([
                'file' => $filename
            ]);
        }

        return redirect()->route('binders.documents.index', $document->binder)->with('success', 'Document updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Document $document
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy(Document $document)
    {
        $this->authorize('manage', $document->binder);
        
        $document->delete();

        return redirect()->back()->with('success', 'Document deleted');
    }
}
