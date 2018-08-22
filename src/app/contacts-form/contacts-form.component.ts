import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { contactModel } from '../Shared/contactModel';
import { contactService } from '../Shared/ContactService';
import {validators} from '../Shared/Validators.service';

@Component({
  selector: 'contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit {
  contactsForm: FormGroup;
  editMode:boolean = false;
  contactModel: contactModel;
  constructor(private contactService: contactService, private validatorService: validators) { }

  ngOnInit() {
    if(!this.editMode){
    this.contactsForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email':new FormControl(null, [Validators.required,Validators.email, validators.dupeEmailValidator]),
      'phone': new FormControl(null, [Validators.required, validators.phoneNumberValidator, validators.dupePhoneNumber]),
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
