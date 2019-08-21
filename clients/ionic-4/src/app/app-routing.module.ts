import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'contacts/:id', loadChildren: './pages/contact/contact.module#ContactPageModule' },
  { path: 'contacts', loadChildren: './pages/contacts/contacts.module#ContactsPageModule' },
  { path: 'days/:id', loadChildren: './pages/day/day.module#DayPageModule' },
  { path: 'documents', loadChildren: './pages/documents/documents.module#DocumentsPageModule' },
  { path: 'events/:id', loadChildren: './pages/event/event.module#EventPageModule' },
  { path: 'notes/:id', loadChildren: './pages/note/note.module#NotePageModule' },
  { path: 'notes', loadChildren: './pages/notes/notes.module#NotesPageModule' },
  { path: 'sync', loadChildren: './pages/sync/sync.module#SyncPageModule' },
  { path: 'documents/:id', loadChildren: './pages/document/document.module#DocumentPageModule' },
  { path: 'terms', loadChildren: './pages/terms/terms.module#TermsPageModule' },
  { path: 'privacy', loadChildren: './pages/privacy/privacy.module#PrivacyPageModule' },
  { path: 'about-cds', loadChildren: './pages/about-cds/about-cds.module#AboutCdsPageModule' },
  { path: 'itinerary', loadChildren: './pages/itinerary/itinerary.module#ItineraryPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
