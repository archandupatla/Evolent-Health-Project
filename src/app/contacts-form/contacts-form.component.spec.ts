import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsFormComponent } from './contacts-form.component';
import { ContactService } from '../Shared/ContactService';
import { StoreContacts } from '../Shared/StoreContacts.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorFunctions } from '../Shared/Validators.service';
import { HttpClientModule } from '@angular/common/http';

describe('ContactsFormComponent', () => {
  let component: ContactsFormComponent;
  let fixture: ComponentFixture<ContactsFormComponent>;
  let testcontactsService: ContactService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsFormComponent ],
      providers:[ContactService , StoreContacts, ValidatorFunctions],
      imports:[BrowserModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testcontactsService = TestBed.get(ContactService);
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
        spyOn(component, 'onSubmit');
        const form = fixture.debugElement.query(By.css('form'));
        form.triggerEventHandler('submit', null);
        fixture.detectChanges();
        expect(component.onSubmit).toHaveBeenCalled();
  })) 
});
