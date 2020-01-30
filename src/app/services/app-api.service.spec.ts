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

  const dummyCountiesTownsCommunitiesResponse = {
    counties: [],
    towns: [],
    communities: []
  };

  it("getCountiesTownsCommunitiesRequest() should return data", () => {
    service.getCountiesTownsCommunitiesRequest().subscribe(res => {
      expect(res).toEqual(dummyCountiesTownsCommunitiesResponse);
    });

    const req = httpMock.expectOne(baseApiUrl + "/list.php");
    expect(req.request.method).toBe("GET");
    req.flush(dummyCountiesTownsCommunitiesResponse);
  });

  const dummyCountyTownCommunityResponse = {
    entityType: "number",
    ID: "number",
    name: "string",
    countyID: "number",
    countyName: "string",
    address: "string",
    zipCode: "number",
    phone: "string",
    fax: "string",
    email: "string",
    web: "string",
    governor: "string",
    viceGovernor: "string",
    viceGovernor2: "string",
    viceNationalMinority: "string",
    representativeBodyPresident: "string"
  };

  it("getEntityDetailsRequest() should return data", () => {
    service.getEntityDetailsRequest(1, 1).subscribe(res => {
      expect(res).toEqual(dummyCountyTownCommunityResponse);
    });

    const entityType = 1;
    const id = 1;
    const req = httpMock.expectOne(
      baseApiUrl + "/details.php?entityType=" + entityType + "&ID=" + id
    );
    expect(req.request.method).toBe("GET");
    req.flush(dummyCountyTownCommunityResponse);
  });
});
