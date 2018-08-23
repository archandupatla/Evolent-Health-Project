import { TestBed, inject } from '@angular/core/testing';
import { ContactService } from './ContactService';
import { StoreContacts } from './StoreContacts.service';
import { ContactModel } from './ContactModel';
import { HttpClientModule } from '@angular/common/http';

describe('ContactService', () => {
  // let testContactsService: ContactService;
  // let testStoreContacts: jasmine.SpyObj<StoreContacts>
  beforeEach(() => {
    const testStoreContacts = jasmine.createSpyObj('storeContacts', ['updateContacts'])
    TestBed.configureTestingModule({
      providers: [ContactService, {provide:StoreContacts, useValue:testStoreContacts}],
      imports:[HttpClientModule]
    });
  });

  it('should be created', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
  it('should inject storeContacts service', inject([StoreContacts], (service: StoreContacts) => {
    expect(service).toBeTruthy();
  }));

  it('edit contacts method should recieve index and emit contact object', inject([ContactService], (service: ContactService) => {
    spyOn(service, 'editContact')
    service.editContact(0);
    const contacts:ContactModel[] = [{firstname:'test', lastname:'test', email:'test', phone:'test', status:'test'},
    {firstname:'test2', lastname:'test2', email:'test2', phone:'test2', status:'test2'}];
    service.editModeContacts.subscribe((val)=>{
      expect(contacts[0]).toBe(val);
    })  
  }));
  it('delete contacts method should delete contact object from array', inject([ContactService], (service: ContactService) => {
    spyOn(service,'deleteContacts');
    service.deleteContacts(1);
   const contacts:ContactModel[] = [{firstname:'test', lastname:'test', email:'test', phone:'test', status:'test'},
    {firstname:'test2', lastname:'test2', email:'test2', phone:'test2', status:'test2'}];
    service.contactsChange.subscribe((val)=>{
      expect(val.length).toBe(contacts.length - 1);
    })
  }));
  it('add contacts method should add contacts and emit updated contacts', inject([ContactService], (service: ContactService)=>{
    spyOn(service, 'addContacts');
    const length = service.contacts.length;
    service.addContacts({data:'test'});
    service.contactsChange.subscribe((data)=>{
      expect(data.length).toBe(length+1)
    })
  }))
  it('update contacts method should take updated contact object and emit the updated contacts array', inject([ContactService], (service: ContactService)=>{
    spyOn(service, 'updateContacts');
    service.updateContacts({data1:'test1'});
    service.contactsChange.subscribe((contacts)=>{
      expect(contacts[0].data1).toBe('test1')
    })
  }))
});
