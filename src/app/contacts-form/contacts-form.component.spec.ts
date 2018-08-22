import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsFormComponent } from './contacts-form.component';
import { contactService } from '../Shared/ContactService';
import { storeContacts } from '../Shared/storeContacts.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { validators } from '../Shared/Validators.service';
import { HttpClientModule } from '@angular/common/http';

describe('ContactsFormComponent', () => {
  let component: ContactsFormComponent;
  let fixture: ComponentFixture<ContactsFormComponent>;
//  let contactServiceStub: Partial<contactService>;
  // contactServiceStub = {
  //   contacts: [{firstname:'test', lastname:'test', email:'test@test.com', phone:'12345678901', status:'active'}],  
  //  };
  let testcontactsService: contactService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsFormComponent ],
      providers:[contactService , storeContacts, validators],
      imports:[BrowserModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testcontactsService = TestBed.get(contactService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create component with 5 controls', () => {
    expect(component.contactsForm.contains('firstname')).toBeTruthy();
    expect(component.contactsForm.contains('lastname')).toBeTruthy();
    expect(component.contactsForm.contains('email')).toBeTruthy();
    expect(component.contactsForm.contains('phone')).toBeTruthy();
    expect(component.contactsForm.contains('status')).toBeTruthy();
  });
  it('should check required validation for the firstname control', () => {
    let control = component.contactsForm.get('firstname');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should check required validation for the lastname control', () => {
    let control = component.contactsForm.get('lastname');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should check required validation for the email control', () => {
    let control = component.contactsForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should check proper username format for the email control', () => {
    let control = component.contactsForm.get('email');
    control.setValue('test@test.com');
    expect(control.valid).toBeTruthy();
  });
  it('should check proper phone number format for the phone control', () => {
    let control = component.contactsForm.get('phone');
    control.setValue('test');
    expect(control.valid).toBeFalsy();
  });
  it('should check proper phone number format for the phone control', () => {
    let control = component.contactsForm.get('phone');
    control.setValue('12345678901');
    expect(control.valid).toBeFalsy();
  });
  it('should check required validation for the phone control', () => {
    let control = component.contactsForm.get('phone');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should check required validation for the status control', () => {
    let control = component.contactsForm.get('status');
    control.setValue('');
    expect(control.valid).toBeTruthy();
  });
  it('should get contacts from the contactsService while editing', () => {
    let contacts;
   testcontactsService.editModeContacts.subscribe((contacts)=>{
     contacts = contacts;
   })
    expect(component.contactModel).toEqual(contacts)
  });
  it('Should check the service', () => {
    fixture.detectChanges();
   //expect(component.dummy).toContain(testcontactsService.dummy)
  });
  it('should check if edit mode is truthy', (()=>{
    testcontactsService.editModeContacts.subscribe((val)=>{
      expect(component.editMode).toBeTruthy();
      expect(component.contactModel).toBe(val);
    })
  }))
  it('should check if we recieved updated contacts from contacts service', (()=>{
    testcontactsService.editModeContacts.subscribe((val)=>{
      expect(component.contactModel).toBe(val);
    })
  }))
  it('should check if delete event resets the form', (()=>{
    testcontactsService.deleteContactEvent.subscribe(()=>{
      expect(component.contactsForm.valid).toBeFalsy();
    })
  }))
  it('should check if form submits the data', (()=>{
    let length = testcontactsService.contacts.length;
    component.onSubmit();
    expect(testcontactsService.contacts.length).toBe(length+1);
  }))
});
