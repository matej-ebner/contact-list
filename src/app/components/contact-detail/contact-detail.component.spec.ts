import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContactDetailComponent } from "./contact-detail.component";
import { CoreModule } from "src/app/core-module/core.module";
import { SharedModule } from "src/app/shared-module/shared.module";
import { RouterTestingModule } from "@angular/router/testing";

import { GeneralService } from "src/app/core-module/services/general.service";
import { AppApiService } from "src/app/services/app-api.service";
import { RouterModule } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ContactNotFoundComponent } from "../contact-not-found/contact-not-found.component";

describe("ContactDetailComponent", () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDetailComponent, ContactNotFoundComponent],
      imports: [
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: "not-found", component: ContactNotFoundComponent }
        ]),
        RouterModule.forRoot([]),
        HttpClientTestingModule
      ],
      providers: [GeneralService, AppApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should create", () => {
    expect(component).toBeTruthy();
  });
});
