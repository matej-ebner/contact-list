import { Injectable } from "@angular/core";
import { Contact } from "../core-module/models/contact.model";

@Injectable()
export class AppDataService {
  allContacts: Contact[];
  favoriteContacts: Contact[];

  constructor() {}

  setContacts(contacts: Contact[], all?: boolean): void {
    if (all) {
      this.allContacts = this.sortContactsAlphabetically(contacts);
      localStorage.setItem("allContacts", JSON.stringify(this.allContacts));
    } else {
      this.favoriteContacts = this.sortContactsAlphabetically(contacts);
      localStorage.setItem(
        "favoriteContacts",
        JSON.stringify(this.favoriteContacts)
      );
    }
  }

  sortContactsAlphabetically(entities: Contact[]): Contact[] {
    return entities.sort(function(x, y) {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    });
  }
}
