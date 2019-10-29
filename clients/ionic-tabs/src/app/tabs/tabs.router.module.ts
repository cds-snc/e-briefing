import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "documents",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/documents/documents.module").then(
                m => m.DocumentsPageModule
              )
          }
        ]
      },
      {
        path: "documents/:id",
        loadChildren: () =>
          import("../pages/document/document.module").then(
            m => m.DocumentPageModule
          )
      },
      {
        path: "contacts",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/contacts/contacts.module").then(
                m => m.ContactsPageModule
              )
          }
        ]
      },
      {
        path: "sync",
        loadChildren: () =>
          import("../pages/sync/sync.module").then(m => m.SyncPageModule)
      },
      {
        path: "",
        redirectTo: "/tabs/documents",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/documents",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
