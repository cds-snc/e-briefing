import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
  { path: 'contacts', loadChildren: './pages/contacts/contacts.module#ContactsPageModule' },
  { path: 'day', loadChildren: './pages/day/day.module#DayPageModule' },
  { path: 'days', loadChildren: './pages/days/days.module#DaysPageModule' },
  { path: 'documents', loadChildren: './pages/documents/documents.module#DocumentsPageModule' },
  { path: 'event', loadChildren: './pages/event/event.module#EventPageModule' },
  { path: 'note', loadChildren: './pages/note/note.module#NotePageModule' },
  { path: 'notes', loadChildren: './pages/notes/notes.module#NotesPageModule' },
  { path: 'sync', loadChildren: './pages/sync/sync.module#SyncPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
