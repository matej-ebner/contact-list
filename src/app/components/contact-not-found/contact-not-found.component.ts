import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { GeneralService } from "src/app/core-module/services/general.service";

@Component({
  selector: "app-contact-not-found",
  templateUrl: "./contact-not-found.component.html",
  styleUrls: ["./contact-not-found.component.scss"]
})
export class ContactNotFoundComponent implements OnInit {
  constructor(private generalService: GeneralService,
    private router:Router) {}

  ngOnInit() {
    this.generalService.hideSpinner();

    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 2000);
  }
}
