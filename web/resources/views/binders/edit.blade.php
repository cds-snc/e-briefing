@extends('layouts.app')

@section('content')
    <div class="columns">
        @push('nav-menu')
            @include('binders._sidebar', ['binder' => $binder])
        @endpush
        <div class="column">
            <h1 class="title">{{ __('Edit Details') }}</h1>

            @include('layouts.flash')

            <form action="{{ route('binders.update', $binder) }}" method="POST">
                {{ method_field('PUT') }}
                {{ csrf_field() }}
                @include('binders._form')

                <button type="submit" class="button is-primary">Submit</button>
            </form>
        </div>
    </div>

@endsection