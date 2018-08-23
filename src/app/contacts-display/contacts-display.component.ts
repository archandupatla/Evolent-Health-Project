import { Component, OnInit } from '@angular/core';
import { ContactService } from '../Shared/ContactService';
import { ContactModel } from '../Shared/ContactModel';
import { StoreContacts } from '../Shared/StoreContacts.service';
import {EventEmitter} from "@angular/core";

@Component({
  selector: 'contacts-display',
  templateUrl: './contacts-display.component.html',
  styleUrls: ['./contacts-display.component.css']
})
export class ContactsDisplayComponent implements OnInit {
  contacts: ContactModel[] = [];
  emitContacts = new EventEmitter<ContactModel[]>();
  constructor(private contactService: ContactService, private storeContacts: StoreContacts) { }

  ngOnInit() {
  this.storeContacts.getContacts().subscribe((contacts:ContactModel[])=>{
    if(contacts){
    this.contacts= contacts
    this.contactService.contacts = this.contacts;
    }
  })
   this.contactService.contactsChange.subscribe((val)=>{
   this.contacts = val;
   })
  }
  editItem(index: number){
   this.contactService.editContact(index);
  }
  deleteItem(index: number){
   this.contactService.deleteContacts(index);
  }
}
