import { TestBed, inject } from '@angular/core/testing';
import { contactService } from './ContactService';
import { storeContacts } from './storeContacts.service';
import { contactModel } from './contactModel';
import { HttpClientModule } from '@angular/common/http';

describe('contactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [contactService, storeContacts],
      imports:[HttpClientModule]
    });
  });

  it('should be created', inject([contactService], (service: contactService) => {
    expect(service).toBeTruthy();
  }));
  it('add contacts method should add contacts, should emit updated contacts', inject([contactService], (service: contactService) => {
    let length = service.contacts.length;
    let contactDetail:contactModel = {firstname:'test', lastname:'test',email:'test', phone:'test', status:'test'}
    service.addContacts(contactDetail);
    expect(service.contacts.length).toBe(length+1);
    service.contactsChange.subscribe((val)=>{
      expect(val.length).toBe(length+1);
    })
  }));
  it('edit contacts method should recieve index and emit contact object', inject([contactService], (service: contactService) => {
    service.editContact(0);
    let contacts:contactModel[] = [{firstname:'test', lastname:'test', email:'test', phone:'test', status:'test'},
    {firstname:'test2', lastname:'test2', email:'test2', phone:'test2', status:'test2'}];
    service.editModeContacts.subscribe((val)=>{
      expect(contacts[0]).toBe(val);
    })
    
  }));
  it('delete contacts method should delete contact object from array', inject([contactService], (service: contactService) => {
   service.deleteContacts(1);
   let contacts:contactModel[] = [{firstname:'test', lastname:'test', email:'test', phone:'test', status:'test'},
    {firstname:'test2', lastname:'test2', email:'test2', phone:'test2', status:'test2'}];
    service.contactsChange.subscribe((val)=>{
      expect(val.length).toBe(contacts.length - 1);
    })
  }));
});
