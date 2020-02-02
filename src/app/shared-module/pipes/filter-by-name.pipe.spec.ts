import { FilterByNamePipe } from "./filter-by-name.pipe";

describe("FilterByNamePipe", () => {
  it("Create an instance", () => {
    const pipe = new FilterByNamePipe();
    expect(pipe).toBeTruthy();
  });

  const unfilteredArray = [
    {
      "id": 3,
      "name": "Isaiah McGuire",
      "favorite": false,
      "headerImage": "../../../assets/images/people/bald.jpg",
      "email": "ole-ole@gmail.com",
      "phone": [
        {
          "number": "098/555-555",
          "type": "home"
        },
        {
          "number": "098/555-111",
          "type": "work"
        },
        {
          "number": "098/555-222",
          "type": "cell"
        }
      ]
    },
    {
      "id": 4,
      "name": "Nicole",
      "favorite": true,
      "headerImage": "../../../assets/images/people/girl_2.jpg",
      "email": "ole-ole@gmail.com",
      "phone": [
        {
          "number": "098/555-555",
          "type": "home"
        },
        {
          "number": "098/555-111",
          "type": "work"
        },
        {
          "number": "098/555-222",
          "type": "cell"
        }
      ]
    }
  ];

  const filteredArray = [
    {
      "id": 4,
      "name": "Nicole",
      "favorite": true,
      "headerImage": "../../../assets/images/people/girl_2.jpg",
      "email": "ole-ole@gmail.com",
      "phone": [
        {
          "number": "098/555-555",
          "type": "home"
        },
        {
          "number": "098/555-111",
          "type": "work"
        },
        {
          "number": "098/555-222",
          "type": "cell"
        }
      ]
    }
  ];

  it("Filter by name", () => {
    const pipe = new FilterByNamePipe();
    const result = pipe.transform(unfilteredArray, "ni");
    expect(result).toEqual(filteredArray);
  });
});
