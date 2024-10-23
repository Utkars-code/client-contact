import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';

const routes: Routes = [
  // { path: 'contact-list', component: ContactListComponent }, // Add your contact list route
  // { path: '', redirectTo: '/contact-list', pathMatch: 'full' } // Default route 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
