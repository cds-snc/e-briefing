@extends('layouts.app')

@section('content')
    <div class="container">
        <h1 class="title">{{ __('Create a Binder') }}</h1>

        @include('layouts.flash')

        <form action="{{ route('binders.store') }}" method="POST">
            {{ csrf_field() }}
            @include('binders._form')

            <button type="submit" class="button is-primary">Submit</button>
        </form>
    </div>
@endsection