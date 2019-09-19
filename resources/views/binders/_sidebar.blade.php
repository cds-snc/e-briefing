<div class="column is-2">
    <aside class="menu">
        <p class="menu-label">
            Manage Binder
        </p>
        <ul class="menu-list">
            <li><a href="{{ route('binders.show', $binder) }}">Binder</a></li>
            <li><a href="{{ route('binders.days.index', $binder) }}">Itinerary</a></li>
            <li><a href="{{ route('binders.people.index', $binder) }}">People</a></li>
            <li><a href="{{ route('binders.articles.index', $binder) }}">My Trip</a></li>
            <li><a href="{{ route('binders.documents.index', $binder) }}">Documents</a></li>
        </ul>
        @if(auth()->user()->id == $binder->creator->id)
            <hr>
            <ul class="menu-list">
                <li><a href="{{ route('binders.collaborators.index', $binder) }}">Collaborators</a></li>
            </ul>
        @endif
    </aside>
</div>