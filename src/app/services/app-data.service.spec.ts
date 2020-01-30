import { TestBed, getTestBed } from "@angular/core/testing";
import { AppDataService } from "./app-data.service";

describe("AppDataService", () => {
  let injector: TestBed;
  let service: AppDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AppDataService]
    });

    injector = getTestBed();
    service = injector.get(AppDataService);
  });

  it("Should be created", () => {
    expect(service).toBeTruthy();
  });

  const unsortedCounties = [
    {
      entityType: 1,
      ID: 1,
      name: "ZAGREBAČKA"
    },
    {
      entityType: 1,
      ID: 2,
      name: "KRAPINSKO-ZAGORSKA"
    },
    {
      entityType: 1,
      ID: 3,
      name: "SISAČKO-MOSLAVAČKA"
    },
    {
      entityType: 1,
      ID: 4,
      name: "KARLOVAČKA"
    }
  ];

  const sortedCounties = [
    {
      entityType: 1,
      ID: 4,
      name: "KARLOVAČKA"
    },
    {
      entityType: 1,
      ID: 2,
      name: "KRAPINSKO-ZAGORSKA"
    },
    {
      entityType: 1,
      ID: 3,
      name: "SISAČKO-MOSLAVAČKA"
    },
    {
      entityType: 1,
      ID: 1,
      name: "ZAGREBAČKA"
    }
  ];

  it("Alphabetically sorting entities works", () => {
    const sortedEntityArray = service.sortCountiesTownsCommunitiesAlphabetically(
      unsortedCounties
    );

    expect(sortedEntityArray).toEqual(sortedCounties);
  });

  const unfilteredArray = [
    {
      entityType: 2,
      ID: 82,
      name: "Osijek",
      countyID: 14,
      countyName: "OSJEČKO-BARANJSKA"
    },
    {
      entityType: 3,
      ID: 25,
      name: "Žumberak",
      countyID: 1,
      countyName: "ZAGREBAČKA"
    },
    {
      entityType: 3,
      ID: 333,
      name: "Lovreć",
      countyID: 17,
      countyName: "SPLITSKO-DALMATINSKA"
    }
  ];

  const filteredArray = [
    {
      entityType: 2,
      ID: 82,
      name: "Osijek",
      countyID: 14,
      countyName: "OSJEČKO-BARANJSKA"
    }
  ];

  it("Filter county towns/communities works", () => {
    const filteredEntityArray = service.filterCountyTownsCommunities(
      unfilteredArray,
      14
    );

    expect(filteredEntityArray).toEqual(filteredArray);
  });
});
