import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';

import { ContactsDisplayComponent } from './contacts-display.component';
import { storeContacts } from '../Shared/storeContacts.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { contactService } from '../Shared/ContactService';
import {  of } from 'rxjs';
import 'rxjs/observable/from';
import { HttpClientModule } from '@angular/common/http';
describe('ContactsDisplayComponent', () => {
  let component: ContactsDisplayComponent;
  let fixture: ComponentFixture<ContactsDisplayComponent>;
  let testcontactsService: contactService;
  let testStoreContacts: storeContacts;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsDisplayComponent ],
      providers:[storeContacts, contactService],
      imports:[FormsModule, BrowserModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsDisplayComponent);
    component = fixture.componentInstance;
    testcontactsService = TestBed.get(contactService);
    testStoreContacts = TestBed.get(storeContacts);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
it('should load contacts from server', (()=>{
  spyOn(testStoreContacts,'getContacts').and.
  returnValue(of([{firstname:'test', lastname:'test', email:'test', phone:'test', status:'test'}]));
  fixture.detectChanges();
  expect(component.contacts.length).toBe(1);
}))
// it('should load contacts from server', (()=>{
//   let contacts;
//   spyOn(testStoreContacts,'getContacts').and.
//   returnValue(of((res: Response)=>{
//     if(res.json()){
//     contacts = res.json();
//     fixture.detectChanges();
//     expect(component.contacts.length).toBe(1);
//     }
//   }));
// }))
it('should edit the contact from contacts array', (()=>{
  component.editItem(1);
  expect(testcontactsService.index).toBe(1);
}))
it('should delete the contact from contacts array', (()=>{
  let length = testcontactsService.contacts.length;
  component.deleteItem(0);
  expect(length).toBe(0);
}))
});
