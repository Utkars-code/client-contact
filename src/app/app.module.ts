import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './components/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ContactPopupComponent } from './components/contact-popup/contact-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactListComponent,
    ContactPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 3000, // duration for the toast to be shown
      positionClass: 'toast-top-right', // position of toast notifications
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
  this.matIconRegistry.addSvgIcon(
    'angular_logo',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/angular-logo.svg')
  );
}
}
