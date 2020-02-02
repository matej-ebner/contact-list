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

  const unsortedContacts = [
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
    },
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
    }
  ];

  const sortedContacts = [
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

  const favoriteContacts = [
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

  it("Alphabetically sorting contacts works", () => {
    const sortedEntityArray = service.sortContactsAlphabetically(
      unsortedContacts
    );

    expect(sortedEntityArray).toEqual(sortedContacts);
  });

  it("Sort and set all/favorite contacts", () => {
    service.setContacts(unsortedContacts);

    expect(service.allContacts).toEqual(unsortedContacts);
    expect(service.favoriteContacts).toEqual(favoriteContacts);
  });
});
