@extends('layouts.app')

@section('content')
    <h1 class="title">{{ __('Binders') }}
        <a href="{{ route('binders.create') }}" class="is-size-6">
            <span class="icon">
                <i class="fa fa-plus-circle"></i>
            </span>
            <span>
                {{ __('Create a Trip') }}
            </span>
        </a>
    </h1>

    @include('layouts.flash')

    @unless($binders->count())
        {{ __('There are currently no trips defined') }}
    @else
        <table class="table">
            <thead>
                <tr>
                    <th>{{ __('Trip name') }}</th>
                    <th>{{ __('Owner') }}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @foreach($binders as $binder)
                    <tr>
                        <td>{{ $binder->name }}</td>
                        <td>{{ $binder->creator->name }}</td>
                        <td class="has-text-right">
                            <a href="{{ route('binders.days.index', $binder) }}" class="button">
                                <span class="icon">
                                    <i class="fa fa-cogs"></i>
                                </span>
                                <span>
                                    {{ __('Manage Binder') }}
                                </span>
                            </a>

                                <form class="is-inline download-form" action="{{ route('binders.generate', $binder) }}" method="POST">
                                    {{ csrf_field() }}
                                    <button type="submit" class="button download-button">
                                        <span class="icon">
                                            <i class="fa fa-download"></i>
                                        </span>
                                        <span>
                                            {{ __('Generate package') }}
                                        </span>
                                    </button>
                                </form>
                            
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endunless
@endsection