import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContactNewEditComponent } from "./contact-new-edit.component";
import { SharedModule } from "src/app/shared-module/shared.module";
import { CoreModule } from "src/app/core-module/core.module";
import { RouterModule } from "@angular/router";

import { GeneralService } from "src/app/core-module/services/general.service";
import { AppApiService } from "src/app/services/app-api.service";
import { RouterTestingModule } from "@angular/router/testing";
import { ContactNotFoundComponent } from '../contact-not-found/contact-not-found.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe("ContactNewEditComponent", () => {
  let component: ContactNewEditComponent;
  let fixture: ComponentFixture<ContactNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactNewEditComponent,ContactNotFoundComponent],
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
    fixture = TestBed.createComponent(ContactNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
