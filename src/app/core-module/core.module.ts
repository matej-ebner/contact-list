import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ErrorComponent } from "./components/error/error.component";

import { GeneralService } from "./services/general.service";
import { ErrorService } from "./services/error.service";

import { HttpMockRequestInterceptor } from "./interceptors/http-mock.interceptor";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";

@NgModule({
  declarations: [SpinnerComponent, ErrorComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  exports: [SpinnerComponent, ErrorComponent],
  providers: [
    GeneralService,
    ErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
})
export class CoreModule {}
