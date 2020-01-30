import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNewEditComponent } from './contact-new-edit.component';

describe('ContactNewEditComponent', () => {
  let component: ContactNewEditComponent;
  let fixture: ComponentFixture<ContactNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactNewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
