@extends('layouts.app')

@section('content')
    <div class="columns">
        @push('nav-menu')
            @include('binders._sidebar', ['binder' => $day->binder])
        @endpush

        <div class="column">
            <h1 class="title">{{ $day->name }} : Create an Event</h1>

            @include('layouts.flash')

            <form action="{{ route('days.events.store', $day) }}" method="POST">
                {{ csrf_field() }}
                @include('binders.days.events._form')

                <button type="submit" class="button is-primary">Submit</button>
            </form>
        </div>
    </div>
@endsection