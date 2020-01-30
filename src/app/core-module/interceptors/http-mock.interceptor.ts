import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import * as defaultUsers from "../../core-module/default-contacts.json";

const requestsUrls = [
  {
    url: environment.apiUrl + "contacts",
    action: "getContacts"
  },
  {
    url: environment.apiUrl + "set-as-favorite",
    action: "setAsFavorite"
  },
  {
    url: environment.apiUrl + "new-contact"
  },
  {
    url: environment.apiUrl + "edit-contact"
  },
  {
    url: environment.apiUrl + "delete-contact"
  }
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = requestsUrls.find(url => url.url === request.url);

    switch (url.action) {
      case "getContacts":
        return this.getContactsFromLocalStorage();
      case "setAsFavorite":
        return this.setAsFavorite(request);
      default:
        return of(new HttpResponse({ status: 500, body: "Server error" }));
    }
  }

  private getContactsFromLocalStorage() {
    let allContactsFromLocalStorage = JSON.parse(
      localStorage.getItem("allContacts")
    );
    let favoriteContactsFromLocalStorage = JSON.parse(
      localStorage.getItem("favoriteContacts")
    );

    const contacts = {
      allContacts:
        allContactsFromLocalStorage === null
          ? defaultUsers["default"]
          : allContactsFromLocalStorage,
      favoriteContacts:
        favoriteContactsFromLocalStorage === null
          ? []
          : favoriteContactsFromLocalStorage
    };

    return of(new HttpResponse({ status: 200, body: contacts }));
  }

  private setAsFavorite(request: HttpRequest<any>) {
    console.log(request.body);
    // console.log(request.params.get['id']);
    
    return this.getContactsFromLocalStorage();
  }
}
