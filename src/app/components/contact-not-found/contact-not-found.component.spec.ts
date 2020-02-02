import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNotFoundComponent } from './contact-not-found.component';

describe('ContactNotFoundComponent', () => {
  let component: ContactNotFoundComponent;
  let fixture: ComponentFixture<ContactNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
