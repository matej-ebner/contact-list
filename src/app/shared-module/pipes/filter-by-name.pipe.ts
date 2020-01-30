import { Pipe, PipeTransform } from "@angular/core";

import { Contact } from 'src/app/core-module/models/contact.model';

@Pipe({
  name: "filterByName"
})
export class FilterByNamePipe implements PipeTransform {
  transform(items: Contact[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
