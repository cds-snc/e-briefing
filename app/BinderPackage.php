<?php

namespace App;


use Chumper\Zipper\Facades\Zipper;
use Illuminate\Support\Facades\Storage;

class BinderPackage
{
    var $storage_path;

    public function generate(Binder $binder)
    {
        $this->storage_path = 'public/packages/binders/' . $binder->id;

        // Delete old package
        Storage::deleteDirectory($this->storage_path);

        $this->generateBinderJson($binder);
        $zip = $this->zipPackage();

        return $zip;
    }

    protected function generateBinderJson(Binder $binder)
    {
        $binder = Binder::with('days')->find($binder->id);
        $binder->update_url = url('/api/binders/' . $binder->id . '/download');

        $binder_json = $binder->toJson();
        Storage::put($this->storage_path . '/binder.json', $binder_json);

        $days_json = $binder->days()->orderBy('date')->get()->toJson();
        Storage::put($this->storage_path . '/days.json', $days_json);

        foreach ($binder->days as $day)
        {
            $this->generateDayJson($day);

            foreach ($day->events as $event) {
                $this->generateEventJson($event);
            }
        }

        $this->generateDocumentsJson($binder);

        foreach ($binder->documents as $document)
        {
            $this->generateDocumentJson($document);
        }

        $this->generateArticlesJson($binder);

        foreach ($binder->articles as $article)
        {
            $this->generateArticleJson($article);
        }

        $this->generatePeopleJson($binder);

        foreach ($binder->people as $person)
        {
            $this->generatePersonJson($person);
        }
    }

    protected function generateDayJson(Day $day)
    {
        $json = Day::with('events', 'events.contacts', 'events.participants')->find($day->id)->toJson();

        Storage::put($this->storage_path . '/days/' . $day->id . '.json', $json);
    }

    protected function generateDocumentsJson(Binder $binder)
    {
        $documents = $binder->documents->groupBy('document_type');

        Storage::put($this->storage_path . '/documents.json', $documents->toJson());
    }

    protected function generateDocumentJson(Document $document)
    {
        $json = $document->toJson();

        Storage::put($this->storage_path . '/documents/' . $document->id . '.json', $json);
        Storage::copy('public/' . $document->file, $this->storage_path . '/assets/' . $document->file);
    }

    protected function generateEventJson(Event $event)
    {
        $json = Event::with('contacts', 'participants', 'documents')->find($event->id)->toJson();

        Storage::put($this->storage_path . '/events/' . $event->id . '.json', $json);
    }

    protected function generateArticlesJson(Binder $binder)
    {
        $json = $binder->articles->toJson();

        Storage::put($this->storage_path . '/articles.json', $json);
    }

    protected function generateArticleJson(Article $article)
    {
        $json = Article::with('documents')->find($article->id)->toJson();

        Storage::put($this->storage_path . '/articles/' . $article->id . '.json', $json);
    }

    protected function generatePeopleJson(Binder $binder)
    {
        $json = $binder->people->toJson();

        Storage::put($this->storage_path . '/people.json', $json);
    }

    protected function generatePersonJson(Person $person)
    {
        $json = $person->toJson();

        Storage::put($this->storage_path . '/people/' . $person->id . '.json', $json);

        if ($person->image) {
            Storage::copy('public/' . $person->image, $this->storage_path . '/assets/' . $person->image);
        }
    }

    protected function zipPackage()
    {
        $files = glob(storage_path('app/' . $this->storage_path));
        $zip = storage_path('app/' . $this->storage_path . '/') . 'package.zip';

        Zipper::make($zip)->add($files)->close();

        return $zip;
    }
}