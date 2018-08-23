import {FormControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import { ContactService } from './ContactService';
@Injectable()
export class ValidatorFunctions{
  static contactsService;
  static editMode;
  constructor(private contactsService: ContactService){
    ValidatorFunctions.contactsService = contactsService;
    ValidatorFunctions.contactsService.dupeRecordValidationCheck.subscribe(()=>{
      ValidatorFunctions.editMode = null;
        })
        ValidatorFunctions.contactsService.editModeContacts.subscribe((val)=>{
          ValidatorFunctions.editMode = val;
        });   
  }
      static phoneNumberValidator(control: FormControl) : {[s: string]: boolean}{
            const phNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if(control.value && (!control.value.match(phNo) || control.value.length !== 10)){
              return {'phoneInvalid': true}
            }
            return null;
          }
          
      static dupeEmailValidator(control: FormControl) : {[s: string]: boolean}{
         const contacts = ValidatorFunctions.contactsService.contacts;
            for(let contact of contacts){
              if(ValidatorFunctions.editMode && ValidatorFunctions.editMode.email !== control.value && control.value === contact.email){
                  return {'emailInvalid': true}   
              } 
               else if(!ValidatorFunctions.editMode && control.value === contact.email){
                return {'emailInvalid': true}
              }
            }
           return null;
          }     
          static dupePhoneNumber(control: FormControl) : {[s: string]: boolean}{
            const contacts = ValidatorFunctions.contactsService.contacts;
                for(let contact of contacts){
                  if(ValidatorFunctions.editMode && ValidatorFunctions.editMode.phone !== control.value && control.value === contact.phone){
                    return {'dupePhone': true}   
                }
                  else if(!ValidatorFunctions.editMode && control.value === contact.phone){
                    return {'dupePhone': true}
                  }
                }
               return null;
              }    
}