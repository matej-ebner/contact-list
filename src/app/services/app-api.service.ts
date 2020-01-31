import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";

@Injectable()
export class AppApiService {
  baseApiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getContactsRequest(): Observable<any> {
    const url = this.baseApiUrl + "contacts";
    return this.httpClient.get(url);
  }

  getContactRequest(contactId: number): Observable<any> {
    const url = this.baseApiUrl + "contact-detail/?id=" + contactId;
    return this.httpClient.get(url);
  }

  setAsFavoriteRequest(formData): Observable<any> {
    const url = this.baseApiUrl + "set-as-favorite";
    return this.httpClient.patch(url, JSON.stringify(formData));
  }

  // newContactRequest(formData):Observable<any>{
  //   const url = this.baseApiUrl + "new-contact";
  //   return this.httpClient.post(url,JSON.stringify(formData));
  // }

  // getEntityDetailsRequest(entityType: number, id: number): Observable<any> {
  //   const url =
  //     this.baseApiUrl + "/details.php?entityType=" + entityType + "&ID=" + id;
  //   return this.httpClient.get(url);
  // }
}
