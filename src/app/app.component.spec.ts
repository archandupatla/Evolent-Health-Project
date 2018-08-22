import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ContactsDisplayComponent} from './contacts-display/contacts-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';
import { ContactService } from './Shared/ContactService';
import { StoreContacts } from './Shared/StoreContacts.service';
import { ValidatorFunctions } from './Shared/Validators.service';
import { HttpClientModule } from '@angular/common/http';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,ContactsDisplayComponent, ContactsFormComponent],
      imports:[FormsModule, ReactiveFormsModule, HttpClientModule],
      providers:[ContactService, StoreContacts, ValidatorFunctions ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Evolent-Health-Project'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toContain('Evolent-Health-Contact-Form');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Evolent-Health-Contact-Form');
  }));
});
