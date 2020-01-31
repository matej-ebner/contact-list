import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { GeneralService } from "src/app/core-module/services/general.service";
import { ErrorService } from "src/app/core-module/services/error.service";
import { AppApiService } from "src/app/services/app-api.service";

import { Contact } from "src/app/core-module/models/contact.model";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.scss"]
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  isDataAvailable: boolean;
  contactNotFound: boolean;
  contact: Contact;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private appApiService: AppApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const contactId = +this.route.snapshot.paramMap.get("id");
    this.getContact(contactId);
  }

  getContact(contactId: number) {
    this.generalService.showSpinner();
    const getContactSubscription = this.appApiService
      .getContactRequest(contactId)
      .subscribe(
        (response: Contact) => {

console.log(response);


          this.contact = response;
          this.isDataAvailable = true;
          this.generalService.hideSpinner();
        },
        error => {
          if (error.status === 404) {
            this.contactNotFound = true;
            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 1000);
          }

          this.generalService.hideSpinner();
        }
      );
    this.subscriptions.push(getContactSubscription);
  }

  ngOnDestroy(): void {
    this.generalService.unsubscribeFromSubscriptions(this.subscriptions);
  }
}
