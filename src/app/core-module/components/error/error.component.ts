import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ErrorService } from "../../services/error.service";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"]
})
export class ErrorComponent implements OnInit {
  showError: boolean;

  constructor(private errorService: ErrorService, private router: Router) {}

  ngOnInit() {
    this.errorService.error.subscribe(data => {
      this.showError = data;

      setTimeout(() => {
        this.showError = false;
        this.router.navigate(["/"]);
      }, 2000);
    });
  }
}
