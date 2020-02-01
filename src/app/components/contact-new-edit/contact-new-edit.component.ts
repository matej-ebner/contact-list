import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

import { GeneralService } from "src/app/core-module/services/general.service";

import { Contact, PhoneNumber } from "src/app/core-module/models/contact.model";

@Component({
  selector: "app-contact-new-edit",
  templateUrl: "./contact-new-edit.component.html",
  styleUrls: [
    "./contact-new-edit.component.scss",
    "../../components/contact-detail/contact-detail.component.scss"
  ]
})
export class ContactNewEditComponent implements OnInit {
  newContact: boolean;
  contact: Contact;
  contactForm: FormGroup;
  invalidForm: boolean;
  headerImageMissing: boolean;

  @ViewChild("headerImageInput", { static: true }) headerImageInput;
  headerImageLocalPath: string;

  constructor(private generalService: GeneralService) {}

  ngOnInit() {
    this.newContact = true;
    this.initForm();
  }

  private initForm(): void {
    let name: string;
    let email: string;
    
    // this.headerImageLocalPath = this.contact.headerImage;
    // const name = this.contact.name;
    // const email = this.contact.email;
    // const phone = this.contact.phone;

    this.contactForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        this.generalService.noEmptySpaceValidator
      ]),
      email: new FormControl(email, [
        Validators.required,
        this.generalService.noEmptySpaceValidator
      ]),
      phoneArray: new FormArray([])
    });

    if (!this.newContact) {
      const phoneFormArray = this.getPhoneFormArray();
      this.contact.phone.forEach((phone: PhoneNumber) => {
        phoneFormArray.push(
          new FormGroup({
            number: new FormControl(phone.number),
            type: new FormControl(phone.type)
          })
        );
      });
    } else {
      this.addNumber();
    }
  }

  previewHeaderImage(event: any): void {
    const reader = new FileReader();
    reader.onload = (response: any) => {
      this.headerImageLocalPath = response.target.result;
      this.headerImageMissing = false;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  private getPhoneFormArray(): FormArray {
    return this.contactForm.get("phoneArray") as FormArray;
  }

  addNumber(): void {
    const phoneFormArray = this.getPhoneFormArray();

    phoneFormArray.push(
      new FormGroup({
        number: new FormControl(null, [
          Validators.required,
          this.generalService.noEmptySpaceValidator
        ]),
        type: new FormControl(null, [
          (Validators.required, this.generalService.noEmptySpaceValidator)
        ])
      })
    );
  }

  removeNumber(formGroupIndex: number): void {
    const phoneFormArray = this.contactForm.get("phoneArray") as FormArray;
    phoneFormArray.removeAt(formGroupIndex);
  }

  submit() {
    if (this.contactForm.valid) {
      this.headerImageMissing = this.invalidForm = false;
    } else {
      this.invalidForm = true;
      this.headerImageMissing = !this.headerImageLocalPath;

      const formValues = this.contactForm.value;

      // console.log(formValues);
    }
  }
}
