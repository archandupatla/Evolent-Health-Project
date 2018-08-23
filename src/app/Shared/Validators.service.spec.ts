import { TestBed, inject, ComponentFixture, async } from '@angular/core/testing';
import { ContactService } from './ContactService';
import { StoreContacts } from './StoreContacts.service';
import { ValidatorFunctions } from './Validators.service';
import { NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form>
      <input name="email" [ngModel]="email"/>
      <input name="phone" [ngModel]="phone"/>
    </form>
  `
})
class TestComponent {
  email;
}
describe('ValidatorsFunctions', () => {
    let component: ContactsFormComponent;
    let fixture: ComponentFixture<ContactsFormComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactService, StoreContacts, ValidatorFunctions, NgForm],
      imports:[HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations:[ContactsFormComponent,TestComponent]
    });
    fixture = TestBed.createComponent(ContactsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should be created', inject([ValidatorFunctions], (service: ValidatorFunctions) => {
    expect(service).toBeTruthy();
  }));
  
  it('should test the phone number validator function', inject([ValidatorFunctions], (service: ValidatorFunctions) => {
   expect(ValidatorFunctions.phoneNumberValidator(new FormControl('1234567810'))).toBeNull()
  }));
   it('should test the dupe email validator function', inject([ContactService], (service: ContactService)=>{
    const fixture = TestBed.createComponent(TestComponent);
    const comp = fixture.componentInstance;
    const debug = fixture.debugElement;
    const input = debug.query(By.css('[name=email]'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input.nativeElement.value = 'test@test.com';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();
      const contacts = [{email:'test@test.com'}]
      let form: NgForm = debug.children[0].injector.get(NgForm);
      let control = form.control.get('email');
      if(contacts[0].email === control.value){
      expect(control.hasError('emailInvalid')).toBe(true);
      expect(form.control.valid).toEqual(false);
      }
    });
   }))
   it('should test the dupe phone validator function', inject([ContactService], (service: ContactService)=>{
    let fixture = TestBed.createComponent(TestComponent);
    let comp = fixture.componentInstance;
    let debug = fixture.debugElement;
    let input = debug.query(By.css('[name=phone]'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input.nativeElement.value = '1234567890';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();
      const contacts = [{phone:'1234567890'}]
      let form: NgForm = debug.children[0].injector.get(NgForm);
      let control = form.control.get('phone');
      if(contacts[0].phone === control.value){
      expect(control.hasError('dupePhone')).toBe(true);
      expect(form.control.valid).toEqual(false);
      }
    });
   }))
  })
