import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import * as defaultContacts from "../../core-module/default-contacts.json";
import { Contact } from "../models/contact.model.js";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

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

// Since there is no API for this application i created this "in app" API
// just so that the application can behave like real application

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = requestsUrls.find(url => request.url.includes(url.url));

    let response: any;

    for (const requestUrl of requestsUrls) {
      if (request.url.includes(requestUrl.url)) {
        switch (url.action) {
          case "newContact":
            response = this.newContact(request);
            break;
          case "editContact":
            response = this.editContact(request);
            break;
          case "deleteContact":
            response = this.deleteContact(request);
            break;
          case "getContacts":
            response = this.getContacts();
            break;
          case "getContact":
            response = this.getContact(request);
            break;
          case "setAsFavorite":
            response = this.setAsFavorite(request);
            break;
          default:
            response = false;
            break;
        }
        if (response instanceof Object) {
          if (response.status === 404) {
            this.router.navigate(["/not-found"]);
          } else {
            return of(new HttpResponse({ status: 200, body: response.body }));
          }
        } else {
          return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
              return throwError(error);
            })
          );
        }
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
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
    return this.assembleResponseData(200);
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
    return this.assembleResponseData(200);
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
    return this.assembleResponseData(200, contactsFromLocalStorage);
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

    return this.assembleResponseData(200, contacts);
  }

  private getContact(request: HttpRequest<any>) {
    const contactsFromLocalStorage = this.getContactsFromLocalStorage();
    const contactIdParam = Number(request.urlWithParams.split("=")[1]);

    const contact = contactsFromLocalStorage.find(
      contact => contact.id == contactIdParam
    );

    if (contact) {
      return this.assembleResponseData(200, contact);
    } else {
      return this.assembleResponseData(404);
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

    if (updateContact) {
      return this.assembleResponseData(200, contactsFromLocalStorage);
    } else {
      return this.assembleResponseData(404);
    }
  }

  //////////////// helper functions ///////////////
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

  private assembleResponseData(status: number, body?: Array<any>) {
    return {
      status: status,
      body: body
    };
  }
}
