import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { AppApiService } from "./app-api.service";
import { environment } from "src/environments/environment";

describe("AppApiService", () => {
  const baseApiUrl = environment.apiUrl;
  let injector: TestBed;
  let service: AppApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppApiService]
    });

    injector = getTestBed();
    service = injector.get(AppApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("Should be created", () => {
    expect(service).toBeTruthy();
  });

  const dummyContactsResponse = [
    {
      id: 3,
      name: "Isaiah McGuire",
      favorite: false,
      headerImage: "../../../assets/images/people/bald.jpg",
      email: "ole-ole@gmail.com",
      phone: [
        {
          number: "098/555-555",
          type: "home"
        },
        {
          number: "098/555-111",
          type: "work"
        },
        {
          number: "098/555-222",
          type: "cell"
        }
      ]
    },
    {
      id: 4,
      name: "Nicole",
      favorite: true,
      headerImage: "../../../assets/images/people/girl_2.jpg",
      email: "ole-ole@gmail.com",
      phone: [
        {
          number: "098/555-555",
          type: "home"
        },
        {
          number: "098/555-111",
          type: "work"
        },
        {
          number: "098/555-222",
          type: "cell"
        }
      ]
    }
  ];

  it("getContacts() should return data", () => {
    service.getContactsRequest().subscribe(res => {
      expect(res).toEqual(dummyContactsResponse);
    });

    const req = httpMock.expectOne(baseApiUrl + "contacts");
    expect(req.request.method).toBe("GET");
    req.flush(dummyContactsResponse);
  });

  const dummyContactResponse = {
    id: 4,
    name: "Nicole",
    favorite: true,
    headerImage: "../../../assets/images/people/girl_2.jpg",
    email: "ole-ole@gmail.com",
    phone: [
      {
        number: "098/555-555",
        type: "home"
      },
      {
        number: "098/555-111",
        type: "work"
      },
      {
        number: "098/555-222",
        type: "cell"
      }
    ]
  };

  it("getContact() should return data", () => {
    service.getContactRequest(1).subscribe(res => {
      expect(res).toEqual(dummyContactResponse);
    });

    const id = 1;
    const req = httpMock.expectOne(baseApiUrl + "contact-detail?id=" + id);
    expect(req.request.method).toBe("GET");
    req.flush(dummyContactResponse);
  });

  it("newContactRequest()", () => {
    service.newContactRequest(1).subscribe(res => {
    });

    const req = httpMock.expectOne(baseApiUrl + "new-contact");
    expect(req.request.method).toBe("POST");
    req.flush(dummyContactResponse);
  });

});
