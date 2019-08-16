import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  { path: 'note', loadChildren: './pages/note/note.module#NotePageModule' },
  { path: 'notes', loadChildren: './pages/notes/notes.module#NotesPageModule' },
  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
  { path: 'contacts', loadChildren: './pages/contacts/contacts.module#ContactsPageModule' },
  { path: 'day', loadChildren: './pages/day/day.module#DayPageModule' },
  { path: 'days', loadChildren: './pages/days/days.module#DaysPageModule' },
  { path: 'documents', loadChildren: './pages/documents/documents.module#DocumentsPageModule' },
  { path: 'event', loadChildren: './pages/event/event.module#EventPageModule' },
  { path: 'sync', loadChildren: './pages/sync/sync.module#SyncPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
