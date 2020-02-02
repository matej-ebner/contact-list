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
    url: environment.apiUrl + "new-contact",
    action: "newContact"
  },
  {
    url: environment.apiUrl + "edit-contact",
    action: "editContact"
  },
  {
    url: environment.apiUrl + "delete-contact",
    action: "deleteContact"
  },
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
          case "newContact":
            return this.newContact(request);
          case "editContact":
            return this.editContact(request);
          case "deleteContact":
            return this.deleteContact(request);
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

  private newContact(request: HttpRequest<any>) {
    const contactsFromLocalStorage = this.getContactsFromLocalStorage();

    let newContact: Contact = {
      id: undefined,
      name: undefined,
      headerImage: undefined,
      favorite: false,
      email: undefined,
      phone: []
    };

    newContact = this.newEditContactSetData(request, newContact);

    let maxId = 0;
    contactsFromLocalStorage.map(function(contact: Contact) {
      if (contact.id > maxId) maxId = contact.id;
    });

    newContact.id = maxId + 1;
    contactsFromLocalStorage.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(contactsFromLocalStorage));
    return of(new HttpResponse({ status: 200 }));
  }

  private editContact(request: HttpRequest<any>) {
    const contactIdParam = this.getParamFromBody(request, "id");
    const contactsFromLocalStorage = this.getContactsFromLocalStorage();

    let updateContact = contactsFromLocalStorage.find(
      contact => contact.id == contactIdParam
    );
    const indexOfContact = contactsFromLocalStorage.indexOf(updateContact);

    updateContact = this.newEditContactSetData(request, updateContact);
    contactsFromLocalStorage[indexOfContact] = updateContact;

    localStorage.setItem("contacts", JSON.stringify(contactsFromLocalStorage));
    return of(new HttpResponse({ status: 200 }));
  }

  private deleteContact(request: HttpRequest<any>) {
    const contactIdParam = Number(request.urlWithParams.split("=")[1]);
    const contactsFromLocalStorage = this.getContactsFromLocalStorage();
    let deleteContact = contactsFromLocalStorage.find(
      contact => contact.id == contactIdParam
    );

    const indexOfContact = contactsFromLocalStorage.indexOf(deleteContact);
    contactsFromLocalStorage.splice(indexOfContact, 1);

    localStorage.setItem("contacts", JSON.stringify(contactsFromLocalStorage));
    return of(
      new HttpResponse({ status: 200, body: contactsFromLocalStorage })
    );
  }

  private getContacts(contactsArray?: Contact[]) {
    let contacts: Contact[] = [];
    if (!contactsArray) {
      const contactsFromLocalStorage = this.getContactsFromLocalStorage();
      if (!contactsFromLocalStorage) {
        contacts = defaultContacts["default"];
        localStorage.setItem("contacts", JSON.stringify(contacts));
      } else {
        contacts = contactsFromLocalStorage;
      }
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
    const contactIdParam = this.getParamFromBody(request, "id");
    const setAsFavoriteParam = this.getParamFromBody(request, "setAsFavorite");

    const contactsFromLocalStorage = this.getContactsFromLocalStorage();

    let updateContact = contactsFromLocalStorage.find(
      contact => contact.id == contactIdParam
    );

    const indexOfContact = contactsFromLocalStorage.indexOf(updateContact);
    updateContact.favorite = setAsFavoriteParam;
    contactsFromLocalStorage[indexOfContact] = updateContact;

    localStorage.setItem("contacts", JSON.stringify(contactsFromLocalStorage));
    return of(
      new HttpResponse({ status: 200, body: contactsFromLocalStorage })
    );
  }

  // helper functions
  private getContactsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("contacts"));
  }

  private getParamFromBody(request: HttpRequest<any>, param: string) {
    const body = JSON.parse(request.body);
    return body[param];
  }

  private newEditContactSetData(
    request: HttpRequest<any>,
    contact: Contact
  ): Contact {
    contact.name = this.getParamFromBody(request, "name");
    contact.email = this.getParamFromBody(request, "email");
    contact.headerImage = this.getParamFromBody(request, "headerImage");
    contact.phone = [];
    this.getParamFromBody(request, "phoneArray").forEach(phone => {
      const phoneData = {
        number: phone.number,
        type: phone.type
      };
      contact.phone.push(phoneData);
    });

    return contact;
  }
}
