import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactsDisplayComponent } from './contacts-display/contacts-display.component';
import { contactService } from './Shared/ContactService';
import { storeContacts } from './Shared/storeContacts.service';
import { HttpModule } from '@angular/http';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';
import { validators } from './Shared/Validators.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContactsDisplayComponent,
    ContactsFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [contactService, storeContacts, validators],
  bootstrap: [AppComponent]
})
export class AppModule { }
