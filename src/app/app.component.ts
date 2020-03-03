import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang("en");
    const localstorageLang = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "en";
    this.translateService.use(localstorageLang);

    this.translateService.get("app_title").subscribe(name => {
      this.titleService.setTitle(name);
    });

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateService.get("app_title").subscribe(name => {
        this.titleService.setTitle(name);
      });
    });
  }

  setLanguage(lang: string): void {
    localStorage.setItem("language", lang);
    this.translateService.use(lang);
  }
}
