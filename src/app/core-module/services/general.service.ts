import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";

import { environment } from "src/environments/environment";
import { FormControl } from "@angular/forms";

@Injectable()
export class GeneralService {
  baseUrl = environment.apiUrl;

  spinner = new Subject<boolean>();

  constructor() {}

  // spinner methods
  showSpinner(): void {
    this.spinner.next(true);
  }

  hideSpinner(): void {
    this.spinner.next(false);
  }

  // miscelanious
  unsubscribeFromSubscriptions(subscriptions: Subscription[]): void {
    if (subscriptions) {
      subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    }
  }

  noEmptySpaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { emptySpace: true };
  }

  emailValidationPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}
