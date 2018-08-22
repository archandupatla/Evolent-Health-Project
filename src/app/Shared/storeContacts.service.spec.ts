import { TestBed, async, inject } from '@angular/core/testing';
import { StoreContacts } from './StoreContacts.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
describe('StoreContacts', () => {
let httpClientSpy: {get: jasmine.Spy}
let service: StoreContacts;
let httpTestMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      providers:[StoreContacts],
      imports:[HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.get(StoreContacts);
    httpTestMock = TestBed.get(HttpTestingController)
  }));
  it('expects get contacts to fetch data from server',
  inject([HttpTestingController, StoreContacts],
    (httpMock: HttpTestingController, service: StoreContacts) => {
      service.getContacts().subscribe((data) => {
        expect(data).toBeTruthy();
      });
      const req = httpMock.expectOne('https://evolent-health-6b426.firebaseio.com/data.json');
      expect(req.request.method).toEqual('GET');
      req.flush({data: '[{firstname:"test", lastname:"test", email:"test", phone:"test", status:"test"}]'});
    })
);
it('expects update contacts to push data to server',
inject([HttpTestingController, StoreContacts],
  (httpMock: HttpTestingController, service: StoreContacts) => {
    let contacts = [{firstname:"test", lastname:"test", email:"test", phone:"test", status:"test"}];
    service.updateContacts(contacts).subscribe(data => {
      expect(data).toBeTruthy();
    });
    const req = httpMock.expectOne('https://evolent-health-6b426.firebaseio.com/data.json');
    expect(req.request.method).toEqual('PUT');
    req.flush({data: '[{firstname:"test", lastname:"test", email:"test", phone:"test", status:"test"}]'});
  })
);
});