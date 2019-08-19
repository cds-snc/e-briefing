import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'documents',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/documents/documents.module').then(m => m.DocumentsPageModule)
          }
        ]
      },
      {
        path: 'documents/:id',
        loadChildren: () =>
          import('../pages/document/document.module').then(m => m.DocumentPageModule)
      },
      {
        path: 'days',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/days/days.module').then(m => m.DaysPageModule)
          }
        ]
      },
      {
        path: 'contacts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/contacts/contacts.module').then(m => m.ContactsPageModule)
          }
        ]
      },
      {
        path: 'contacts/:id',
        loadChildren: () =>
          import('../pages/contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: 'notes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/notes/notes.module').then(m => m.NotesPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
