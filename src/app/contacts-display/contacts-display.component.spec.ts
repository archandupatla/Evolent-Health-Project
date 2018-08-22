import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { ContactsDisplayComponent } from './contacts-display.component';
import { StoreContacts } from '../Shared/StoreContacts.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { ContactService } from '../Shared/ContactService';
import {  of } from 'rxjs';
import 'rxjs/observable/from';
import { HttpClientModule } from '@angular/common/http';

describe('ContactsDisplayComponent', () => {
  let component: ContactsDisplayComponent;
  let fixture: ComponentFixture<ContactsDisplayComponent>;
  let testcontactsService: ContactService;
  let testStoreContacts: StoreContacts;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsDisplayComponent ],
      providers:[StoreContacts, ContactService],
      imports:[FormsModule, BrowserModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsDisplayComponent);
    component = fixture.componentInstance;
    testcontactsService = TestBed.get(ContactService);
    testStoreContacts = TestBed.get(StoreContacts);
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
it('should edit the contact from contacts array', (()=>{
  component.editItem(1);
  expect(testcontactsService.index).toBe(1);
}))
});
