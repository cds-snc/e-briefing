@extends('layouts.app')

@section('content')
    <div class="columns">
        @push('nav-menu')
        @include('trips._sidebar', ['trip' => $event->trip])
        @endpush

        <div class="column">
            <h1 class="title">{{ __('Add a Document') }}</h1>

            @include('layouts.flash')

            <form action="{{ route('events.documents.store', $event) }}" method="POST" enctype="multipart/form-data">
                {{ csrf_field() }}
                @include('trips.documents._form')

                <button type="submit" class="button is-primary">Submit</button>
            </form>
        </div>
    </div>
@endsection