@extends('layouts.app')

@section('content')
    <div class="columns">
        @push('nav-menu')
            @include('binders._sidebar', ['binder' => $binder])
        @endpush

        <div class="column">
            <h1 class="title">{{ __('Add an Article') }}</h1>

            @include('layouts.flash')

            <form action="{{ route('binders.articles.store', $binder) }}" method="POST">
                {{ csrf_field() }}
                @include('binders.articles._form')

                <button type="submit" class="button is-primary">Submit</button>
            </form>
        </div>
    </div>
@endsection