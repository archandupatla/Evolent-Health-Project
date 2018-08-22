import {ContactModel} from './ContactModel';
import {EventEmitter, Injectable} from '@angular/core';
import { StoreContacts } from './StoreContacts.service';
@Injectable()
export class ContactService{
contacts: ContactModel[] = [];
constructor(private storeContacts: StoreContacts){
}
index: number;
dupeRecordValidationCheck = new EventEmitter<void>();
contactsChange = new EventEmitter<ContactModel[]>();
editModeContacts = new EventEmitter<ContactModel>();
deleteContactEvent = new EventEmitter<void>();

addContacts(conctactDetail){
this.contacts.push(conctactDetail);
this.contactsChange.emit(this.contacts.slice());
this.dupeRecordValidationCheck.emit();
this.storeContacts.updateContacts(this.contacts).subscribe((res)=>{console.log(res)}, (error)=>{console.log(error)});
}
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