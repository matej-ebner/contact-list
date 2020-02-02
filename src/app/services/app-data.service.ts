import { Injectable } from "@angular/core";
import { Contact } from "../core-module/models/contact.model";

@Injectable()
export class AppDataService {
  allContacts: Contact[];
  favoriteContacts: Contact[];

  constructor() {}

  setContacts(contactsArray: Contact[]): void {
    this.allContacts = this.sortContactsAlphabetically(contactsArray);
    const favoriteContacts = contactsArray.filter(contact => {
      return contact.favorite === true;
    });
    this.favoriteContacts = this.sortContactsAlphabetically(favoriteContacts);
  }

  sortContactsAlphabetically(entities: Contact[]): Contact[] {
    return entities.sort(function(x, y) {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    });
  }
}
