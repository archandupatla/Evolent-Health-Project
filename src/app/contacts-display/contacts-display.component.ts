import { Component, OnInit } from '@angular/core';
import { ContactService } from '../Shared/ContactService';
import { ContactModel } from '../Shared/ContactModel';
import { StoreContacts } from '../Shared/StoreContacts.service';
import{Response} from '@angular/http';
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
  //  this.contactService.returnContacts((data)=>{
  //   this.contacts = data; 
  //  // return data;
  //  });
  // this.storeContacts.getContacts().subscribe((res: Response)=>{ 
  //   if(res.json()){  
  //       this.contacts  = res.json();
  //       this.contactService.contacts = this.contacts;
  //     }
  // });
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
