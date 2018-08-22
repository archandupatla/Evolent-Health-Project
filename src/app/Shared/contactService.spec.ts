import { TestBed, inject } from '@angular/core/testing';
import { ContactService } from './ContactService';
import { StoreContacts } from './StoreContacts.service';
import { ContactModel } from './ContactModel';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from 'selenium-webdriver/http';
import { store } from '@angular/core/src/render3/instructions';
import { of } from 'rxjs/internal/observable/of';

describe('ContactService', () => {
  let testContactsService: ContactService;
  let testStoreContacts: jasmine.SpyObj<StoreContacts>
  beforeEach(() => {
    const spy = jasmine.createSpyObj('storeContacts', ['updateContacts'])
    TestBed.configureTestingModule({
      providers: [ContactService, {provide:StoreContacts, useValue:spy}],
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
    let contacts:ContactModel[] = [{firstname:'test', lastname:'test', email:'test', phone:'test', status:'test'},
    {firstname:'test2', lastname:'test2', email:'test2', phone:'test2', status:'test2'}];
    service.editModeContacts.subscribe((val)=>{
      expect(contacts[0]).toBe(val);
    })  
  }));
  it('delete contacts method should delete contact object from array', inject([ContactService], (service: ContactService) => {
    spyOn(service,'deleteContacts');
    service.deleteContacts(1);
   let contacts:ContactModel[] = [{firstname:'test', lastname:'test', email:'test', phone:'test', status:'test'},
    {firstname:'test2', lastname:'test2', email:'test2', phone:'test2', status:'test2'}];
    service.contactsChange.subscribe((val)=>{
      expect(val.length).toBe(contacts.length - 1);
    })
  }));
});
