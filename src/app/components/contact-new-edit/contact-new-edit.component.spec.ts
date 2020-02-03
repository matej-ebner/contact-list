import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContactNewEditComponent } from "./contact-new-edit.component";
import { SharedModule } from "src/app/shared-module/shared.module";
import { CoreModule } from "src/app/core-module/core.module";
import { RouterModule } from "@angular/router";

import { GeneralService } from "src/app/core-module/services/general.service";
import { AppApiService } from "src/app/services/app-api.service";
import { RouterTestingModule } from "@angular/router/testing";
import { ContactNotFoundComponent } from "../contact-not-found/contact-not-found.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormArray } from "@angular/forms";

describe("ContactNewEditComponent", () => {
  let component: ContactNewEditComponent;
  let fixture: ComponentFixture<ContactNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactNewEditComponent, ContactNotFoundComponent],
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

    // @ts-ignore
    component.initForm();
  });

  it("Should create", () => {
    expect(component).toBeTruthy();
  });

  it("Should initiate ContactForm", () => {
    expect(component.contactForm).toBeDefined();
  });

  it("ContactForm should have 'name','email','phoneArray' controls", () => {
    expect(component.contactForm.get("name")).toBeTruthy();
    expect(component.contactForm.get("email")).toBeTruthy();
    expect(component.contactForm.get("phoneArray")).toBeTruthy();
  });

  it("ContactForm should be invalid without values", () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it("Should validate email pattern", () => {
    const emailFormControl = component.contactForm.get("email");
    emailFormControl.setValue("test@name");
    expect(emailFormControl.valid).toBeFalsy();
  });

  it("ContactForm should be valid if all fields are filled", () => {
    const contactForm = component.contactForm;
    contactForm.get("name").setValue("test name");
    contactForm.get("email").setValue("mata@mata.com");

    const phoneFormGroup = contactForm.get("phoneArray") as FormArray;
    phoneFormGroup
      .at(0)
      .get("number")
      .setValue("555-555");
    phoneFormGroup
      .at(0)
      .get("type")
      .setValue("private");

    expect(contactForm.valid).toBeTruthy();
  });

  it("addNumber() should add new FormGroup to phoneArray", () => {
    const contactForm = component.contactForm;
    const phoneFormGroup = contactForm.get("phoneArray") as FormArray;
    expect(phoneFormGroup.at(1)).toBeFalsy();
    component.addNumber();
    expect(phoneFormGroup.at(1)).toBeTruthy();
  });

  it("removeNumber() should remove FormGroup from phoneArray", () => {
    const contactForm = component.contactForm;
    const phoneFormGroup = contactForm.get("phoneArray") as FormArray;
    expect(phoneFormGroup.at(0)).toBeTruthy();
    component.removeNumber(0);
    expect(phoneFormGroup.at(0)).toBeFalsy();
  });
});
