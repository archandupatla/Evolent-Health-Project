import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { contactService } from './ContactService';
import { storeContacts } from './storeContacts.service';
import { contactModel } from './contactModel';
import { validators } from './Validators.service';
import { NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { HttpClientModule } from '@angular/common/http';

describe('contactService', () => {
    let form: NgForm;
    let component: ContactsFormComponent;
    let fixture: ComponentFixture<ContactsFormComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [contactService, storeContacts, validators, NgForm],
      imports:[HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations:[ContactsFormComponent]
    });
    fixture = TestBed.createComponent(ContactsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should be created', inject([validators], (service: validators) => {
    expect(service).toBeTruthy();
  }));
  
  it('should test the phone number validator function', inject([validators], (service: validators) => {
   expect(validators.phoneNumberValidator(new FormControl('1234567810'))).toBeNull()
  }));
  it('should test the dupe email validator function', inject([validators], (service: validators) => {
      const contact:contactModel = {firstname:'test',lastname:'test', email:'test@test.com', phone:'test', status:'test'};
      let control = new FormControl('test@test.com');
      if(control.value !== contact.email){
        expect(validators.dupeEmailValidator(control)).toBeNull()
      }
   }));
   it('should test the dupe phone validator function', inject([validators], (service: validators) => {
    const contact:contactModel = {firstname:'test',lastname:'test', email:'test@test.com', phone:'12345678901', status:'test'};
    let control = new FormControl('12345678901');
    if(control.value !== contact.phone){
      expect(validators.dupeEmailValidator(control)).toBeNull()
    }
 }));
});
