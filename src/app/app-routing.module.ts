import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { ContactsListComponent } from "./components/contacts-list/contacts-list.component";
import { ContactNewEditComponent } from "./components/contact-new-edit/contact-new-edit.component";
import { ContactDetailComponent } from "./components/contact-detail/contact-detail.component";
import { ContactNotFoundComponent } from './components/contact-not-found/contact-not-found.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: ContactsListComponent },
      { path: "new", component: ContactNewEditComponent },
      { path: "edit/:id", component: ContactNewEditComponent },
      { path: "detail/:id", component: ContactDetailComponent },
      { path: "not-found", component: ContactNotFoundComponent }
    ]
  },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    AppComponent,
    ContactsListComponent,
    ContactNewEditComponent,
    ContactNewEditComponent,
    ContactDetailComponent,
    ContactNotFoundComponent
  ];
}
