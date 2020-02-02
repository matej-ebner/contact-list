import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { GeneralService } from "src/app/core-module/services/general.service";
import { AppApiService } from "src/app/services/app-api.service";

import { Contact, PhoneNumber } from "src/app/core-module/models/contact.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-contact-new-edit",
  templateUrl: "./contact-new-edit.component.html",
  styleUrls: [
    "./contact-new-edit.component.scss",
    "../../components/contact-detail/contact-detail.component.scss"
  ]
})
export class ContactNewEditComponent implements OnInit {
  contact: Contact;
  contactForm: FormGroup;
  invalidForm: boolean;
  headerImageMissing: boolean;

  @ViewChild("headerImageInput", { static: true }) headerImageInput;
  headerImageLocalPath: string;

  showDeleteContactModal: boolean;
  formValuesChanged: boolean;
  showLeaveWithoutSavingModal: boolean;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private appApiService: AppApiService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.router.url.indexOf("new") > -1) {
      this.initForm();
    } else {
      const contactId = +this.route.snapshot.paramMap.get("id");
      this.getContact(contactId);
    }
  }

  getContact(contactId: number) {
    this.generalService.showSpinner();
    const getContactSubscription = this.appApiService
      .getContactRequest(contactId)
      .subscribe(
        (response: Contact) => {
          this.contact = response;
          this.initForm();
          this.generalService.hideSpinner();
        },
        error => {
          this.generalService.hideSpinner();
        }
      );
    this.subscriptions.push(getContactSubscription);
  }

  private initForm(): void {
    let name: string;
    let email: string;

    if (this.contact) {
      this.headerImageLocalPath = this.contact.headerImage;
      name = this.contact.name;
      email = this.contact.email;
    }

    this.contactForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        this.generalService.noEmptySpaceValidator
      ]),
      email: new FormControl(email, [
        Validators.required,
        this.generalService.noEmptySpaceValidator,
        Validators.pattern(this.generalService.emailValidationPattern)
      ]),
      phoneArray: new FormArray([])
    });

    if (this.contact) {
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

    this.contactForm.valueChanges.subscribe(
      () => (this.formValuesChanged = true)
    );
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
    this.invalidForm = false;
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

  submit(): void {
    if (this.contactForm.valid && this.headerImageLocalPath) {
      this.headerImageMissing = this.invalidForm = false;

      const formData = this.contactForm.value;
      if (this.contact) {
        formData["id"] = this.contact.id;
        formData["headerImage"] = this.contact.headerImage;
        this.editContact(formData);
      } else {
        // adding some default images since there is no API to store image
        formData["headerImage"] = "../../../assets/images/people/girl.jpg";
        this.saveNewContact(formData);
      }
    } else {
      this.invalidForm = true;
      this.headerImageMissing = !this.headerImageLocalPath;
    }
  }

  editContact(formData: FormData): void {
    this.generalService.showSpinner();
    const getContactSubscription = this.appApiService
      .editContactRequest(formData)
      .subscribe(
        (response: Contact) => {
          this.redirectAfterSubmit();
        },
        error => {
          this.generalService.hideSpinner();
        }
      );
    this.subscriptions.push(getContactSubscription);
  }

  saveNewContact(formData: FormData): void {
    this.generalService.showSpinner();
    const getContactSubscription = this.appApiService
      .newContactRequest(formData)
      .subscribe(
        (response: Contact) => {
          this.redirectAfterSubmit();
        },
        error => {
          this.generalService.hideSpinner();
        }
      );
    this.subscriptions.push(getContactSubscription);
  }

  deleteContact(): void {
    this.generalService.showSpinner();
    const setAsFavoriteSubscription = this.appApiService
      .deleteContact(this.contact.id)
      .subscribe(
        (response: Contact[]) => {
          this.showDeleteContactModal = false;
          this.redirectAfterSubmit();
        },
        error => {
          this.generalService.hideSpinner();
        }
      );
    this.subscriptions.push(setAsFavoriteSubscription);
  }

  checkFormInputs(): void {
    if (this.formValuesChanged) {
      this.showLeaveWithoutSavingModal = true;
    } else {
      this.showLeaveWithoutSavingModal = false;
      this.leaveWithoutSaving();
    }
  }

  leaveWithoutSaving(): void {
    this.router.navigate(["/"]);
  }

  private redirectAfterSubmit(): void {
    this.generalService.hideSpinner();
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    this.generalService.unsubscribeFromSubscriptions(this.subscriptions);
  }
}
