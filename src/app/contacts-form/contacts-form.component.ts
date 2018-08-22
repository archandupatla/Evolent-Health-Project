import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactModel } from '../Shared/ContactModel';
import { ContactService } from '../Shared/ContactService';
import {ValidatorFunctions} from '../Shared/Validators.service';

@Component({
  selector: 'contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit {
  contactsForm: FormGroup;
  editMode:boolean = false;
  contactModel: ContactModel;
  constructor(private contactService: ContactService, private validatorService: ValidatorFunctions) { }

  ngOnInit() {
    if(!this.editMode){
    this.contactsForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email':new FormControl(null, [Validators.required,Validators.email, ValidatorFunctions.dupeEmailValidator]),
      'phone': new FormControl(null, [Validators.required, ValidatorFunctions.phoneNumberValidator, ValidatorFunctions.dupePhoneNumber]),
      'status': new FormControl('Active')
    })
  }
    this.contactService.editModeContacts.subscribe((contactModel)=>{
      this.editMode = true;
     this.contactModel = contactModel;
    this.contactsForm.setValue({
      firstname:contactModel.firstname,
      lastname: contactModel.lastname,
      email: contactModel.email,
      phone: contactModel.phone,
      status: contactModel.status
    })
    })
    this.contactService.deleteContactEvent.subscribe(()=>{
      this.contactsForm.reset();
    })
  }
  onSubmit(){
        if(!this.editMode){
          this.contactService.addContacts(this.contactsForm.value);
        }
      else{
    this.contactService.updateContacts(this.contactsForm.value);
    this.editMode = false;
      }
      this.contactsForm.reset()
  }
}
