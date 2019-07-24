@extends('layouts.app')

@section('content')
    <div class="columns">
        @push('nav-menu')
            @include('binders._sidebar', ['binder' => $binder])
        @endpush

        <div class="column">
            <h1 class="title">{{ $binder->name }} Collaborators</h1>

            @include('layouts.flash')

            @unless($collaborators->count())
                <p>There are no Collaborators added to this Trip yet!</p>
            @else
                <ul>
                    @foreach($collaborators as $collaborator)
                        <li>{{ $collaborator->name }}</li>
                    @endforeach
                </ul>
            @endunless

            @unless($users->count())
                <p>There are no users available to add as Collaborator</p>
            @else
                <form action="{{ route('binders.collaborators.add', $binder) }}" method="post">
                    {{ csrf_field() }}
                    {{ method_field('put') }}
                    <div class="field">
                        <label class="label" for="type">{{ __('Select a User') }}</label>
                        <div class="select">
                            <select name="user_id">
                                <option value="">--select--</option>
                                @foreach($users as $user)
                                    <option value="{{ $user->id }}">{{ $user->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <button type="submit" class="button is-primary">Add Collaborator</button>
                </form>
            @endunless
        </div>
    </div>
@endsection