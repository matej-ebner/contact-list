import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { GeneralService } from "src/app/core-module/services/general.service";
import { AppApiService } from "src/app/services/app-api.service";
import { ErrorService } from "src/app/core-module/services/error.service";
import { AppDataService } from "src/app/services/app-data.service";

import { Contact } from "src/app/core-module/models/contact.model";

@Component({
  selector: "app-contacts-list",
  templateUrl: "./contacts-list.component.html",
  styleUrls: ["./contacts-list.component.scss"]
})
export class ContactsListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  isDataAvailable: boolean;

  allContacts: boolean;
  contacts: Contact[];

  constructor(
    private generalService: GeneralService,
    private appApiService: AppApiService,
    private appDataService: AppDataService
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.generalService.showSpinner();
    const getContactsSubscription = this.appApiService
      .getContactsRequest()
      .subscribe(
        (response: any[]) => {
          this.allContacts = true;
          this.appDataService.setContacts(response);

          this.contacts = this.appDataService.allContacts;
          this.isDataAvailable = true;
          this.generalService.hideSpinner();
        },
        error => {

          this.generalService.hideSpinner();
        }
      );
    this.subscriptions.push(getContactsSubscription);
  }

  switchContactType(toAllContacts: boolean): void {
    this.allContacts = toAllContacts;
    this.contacts = toAllContacts
      ? this.appDataService.allContacts
      : this.appDataService.favoriteContacts;
  }

  markAsFavorite(contactId: number, asFavorite: boolean): void {
    const formData = {
      id: contactId,
      setAsFavorite: asFavorite
    };

    this.generalService.showSpinner();
    const setAsFavoriteSubscription = this.appApiService
      .setAsFavoriteRequest(formData)
      .subscribe(
        (response: any[]) => {
          this.appDataService.setContacts(response);

          this.contacts = this.allContacts
            ? this.appDataService.allContacts
            : this.appDataService.favoriteContacts;

          this.isDataAvailable = true;
          this.generalService.hideSpinner();
        },
        error => {
          this.generalService.hideSpinner();
        }
      );
    this.subscriptions.push(setAsFavoriteSubscription);
  }

  ngOnDestroy(): void {
    this.generalService.unsubscribeFromSubscriptions(this.subscriptions);
  }
}
