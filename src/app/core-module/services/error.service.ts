import { Injectable } from "@angular/core";

import { Subject } from "rxjs";
@Injectable()
export class ErrorService {
  error = new Subject<boolean>();

  constructor() {}

  // show error component
  showError() {
    this.error.next(true);

    setInterval(() => {
      this.error.next(false);
    }, 4000);
  }
  
}
