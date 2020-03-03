import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient
} from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { HttpMockRequestInterceptor } from "./interceptors/http-mock.interceptor";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";

import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ErrorComponent } from "./components/error/error.component";

import { GeneralService } from "./services/general.service";
import { ErrorService } from "./services/error.service";

@NgModule({
  declarations: [SpinnerComponent, ErrorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [SpinnerComponent, ErrorComponent, TranslateModule],
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
