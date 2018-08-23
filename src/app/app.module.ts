import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactsDisplayComponent } from './contacts-display/contacts-display.component';
import { ContactService } from './Shared/ContactService';
import { StoreContacts } from './Shared/StoreContacts.service';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';
import { ValidatorFunctions } from './Shared/Validators.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContactsDisplayComponent,
    ContactsFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ContactService, StoreContacts, ValidatorFunctions],
  bootstrap: [AppComponent]
})
export class AppModule { }
