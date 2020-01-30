import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";

import { environment } from "src/environments/environment";

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
}
