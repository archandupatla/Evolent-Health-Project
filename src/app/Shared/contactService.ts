import {contactModel} from './contactModel';
import {EventEmitter, Injectable} from '@angular/core';
import { storeContacts } from './storeContacts.service';
@Injectable()
export class contactService{
contacts: contactModel[] = [];
constructor(private storeContacts: storeContacts){
}
index: number;
dupeRecordValidationCheck = new EventEmitter<void>();
contactsChange = new EventEmitter<contactModel[]>();
editModeContacts = new EventEmitter<contactModel>();
deleteContactEvent = new EventEmitter<void>();

addContacts(conctactDetail){
this.contacts.push(conctactDetail);
this.contactsChange.emit(this.contacts.slice());
this.dupeRecordValidationCheck.emit();
this.storeContacts.updateContacts(this.contacts).subscribe((res)=>{console.log(res)}, (error)=>{console.log(error)});
}
// returnContacts(){
//      this.storeContacts.getContacts().subscribe((res:Response)=>{
//        if(res.json()){
//          this.contacts = res.json();
//        }
//      })
//      return new Promise((resolve, reject)=>{
//        resolve(this.contacts);
//      })
// }

editContact(index){
this.editModeContacts.emit(this.contacts[index]);
  this.index = index;
}

updateContacts(param){
this.contacts[this.index] = param;
this.dupeRecordValidationCheck.emit();
this.contactsChange.emit(this.contacts.slice())
this.storeContacts.updateContacts(this.contacts).subscribe((res)=>{console.log(res)}, (error)=>{console.log(error)});
}

deleteContacts(index){
    this.contacts.splice(index,1);
    this.contactsChange.emit(this.contacts.slice());
    this.deleteContactEvent.emit();
    this.storeContacts.updateContacts(this.contacts).subscribe((res)=>{console.log(res)}, (error)=>{console.log(error)});
}
}