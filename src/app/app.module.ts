import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { SharedModule } from "./shared-module/shared.module";
import { CoreModule } from "./core-module/core.module";
import { AppRoutingModule } from "./app-routing.module";

import { AppApiService } from "./services/app-api.service";
import { AppDataService } from "./services/app-data.service";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppRoutingModule.components],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [AppApiService, AppDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
