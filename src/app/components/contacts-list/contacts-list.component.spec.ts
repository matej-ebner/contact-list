import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContactsListComponent } from "./contacts-list.component";
import { CoreModule } from "src/app/core-module/core.module";
import { SharedModule } from "src/app/shared-module/shared.module";
import { RouterTestingModule } from "@angular/router/testing";

import { GeneralService } from "src/app/core-module/services/general.service";
import { AppApiService } from 'src/app/services/app-api.service';
import { AppDataService } from 'src/app/services/app-data.service';

describe("ContactsListComponent", () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsListComponent],
      imports: [CoreModule, SharedModule, RouterTestingModule],
      providers: [GeneralService,AppApiService,AppDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should create", () => {
    expect(component).toBeTruthy();
  });

  it("Should switch contact type", () => {
    component.switchContactType(true);
    expect(component.allContacts).toBeTruthy();
  });
});
