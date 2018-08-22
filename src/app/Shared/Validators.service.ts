import {FormControl, Validators} from '@angular/forms';
import { Injectable } from '@angular/core';
import { contactService } from './ContactService';
@Injectable()
export class validators{
  static contactsService;
  static editMode;
  constructor(private contactsService: contactService){
     validators.contactsService = contactsService;
          validators.contactsService.dupeRecordValidationCheck.subscribe(()=>{
          validators.editMode = null;
        })
      validators.contactsService.editModeContacts.subscribe((val)=>{
          validators.editMode = val;
        });   
  }
      static phoneNumberValidator(control: FormControl) : {[s: string]: boolean}{
            let phNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if(control.value && (!control.value.match(phNo) || control.value.length !== 10)){
              return {'phoneInvalid': true}
            }
            return null;
          }
          
      static dupeEmailValidator(control: FormControl) : {[s: string]: boolean}{
         let contacts = validators.contactsService.contacts;
            for(let contact of contacts){
              if(validators.editMode && validators.editMode.email !== control.value && control.value === contact.email){
                  return {'emailInvalid': true}   
              } 
               else if(!validators.editMode && control.value === contact.email){
                return {'emailInvalid': true}
              }
            }
           return null;
          }     
          static dupePhoneNumber(control: FormControl) : {[s: string]: boolean}{
            let contacts = validators.contactsService.contacts;
                for(let contact of contacts){
                  if(validators.editMode && validators.editMode.phone !== control.value && control.value === contact.phone){
                    return {'dupePhone': true}   
                }
                  else if(!validators.editMode && control.value === contact.phone){
                    return {'dupePhone': true}
                  }
                }
               return null;
              }    
}