@extends('layouts.app')

@section('content')
    <div class="columns">
        @push('nav-menu')
            @include('binders._sidebar', ['binder' => $binder])
        @endpush

        <div class="column">
            <h1 class="title">{{ $binder->name }}</h1>
            <p>{{ $binder->description }}</p>
        </div>
    </div>
@endsection