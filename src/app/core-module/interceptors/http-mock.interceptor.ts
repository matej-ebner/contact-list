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
import * as defaultContacts from "../../core-module/default-contacts.json";
import { Contact } from "../models/contact.model.js";

const requestsUrls = [
  {
    url: environment.apiUrl + "contacts",
    action: "getContacts"
  },
  {
    url: environment.apiUrl + "contact-detail",
    action: "getContact"
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
    const url = requestsUrls.find(url => request.url.includes(url.url));

    for (const requestUrl of requestsUrls) {
      if (request.url.includes(requestUrl.url)) {
        switch (url.action) {
          case "getContacts":
            return this.getContacts();
          case "getContact":
            return this.getContact(request);
          case "setAsFavorite":
            return this.setAsFavorite(request);
          default:
            return of(new HttpResponse({ status: 500, body: "Server error" }));
        }
      }
    }
  }

  private getContacts(contactsArray?: Contact[]) {
    let contacts: Contact[] = [];
    if (!contactsArray) {
      const contactsFromLocalStorage = this.getContactsFromLocalStorage();
      contacts = contactsFromLocalStorage
        ? contactsFromLocalStorage
        : defaultContacts["default"];
    } else {
      contacts = contactsArray;
    }

    return of(new HttpResponse({ status: 200, body: contacts }));
  }

  private getContact(request: HttpRequest<any>) {
    const contactsFromLocalStorage = this.getContactsFromLocalStorage();
    const contactIdParam = Number(request.urlWithParams.split("=")[1]);

    const contact = contactsFromLocalStorage.find(
      contact => contact.id == contactIdParam
    );

    if (contact) {
      return of(new HttpResponse({ status: 200, body: contact }));
    } else {
      return of(new HttpResponse({ status: 404, body: "Contact not found" }));
    }
  }

  private setAsFavorite(request: HttpRequest<any>) {
    const body = JSON.parse(request.body);
    const contactIdParam = body["id"];
    const setAsFavoriteParam = body["setAsFavorite"];

    const contactsFromLocalStorage = this.getContactsFromLocalStorage();

    let updateContact = contactsFromLocalStorage.find(
      contact => contact.id == contactIdParam
    );

    const indexOfContact = contactsFromLocalStorage.indexOf(updateContact);
    updateContact.favorite = setAsFavoriteParam;
    contactsFromLocalStorage[indexOfContact] = updateContact;

    return this.getContacts(contactsFromLocalStorage);
  }

  private getContactsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("contacts"));
  }
}
