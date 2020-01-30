import { FilterByNamePipe } from "./filter-by-name.pipe";

describe("FilterByNamePipe", () => {
  it("Create an instance", () => {
    const pipe = new FilterByNamePipe();
    expect(pipe).toBeTruthy();
  });

  const unfilteredArray = [
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

  const filteredArray = [
    {
      entityType: 1,
      ID: 1,
      name: "ZAGREBAČKA"
    },
    {
      entityType: 1,
      ID: 2,
      name: "KRAPINSKO-ZAGORSKA"
    }
  ];

  it("Filter by name", () => {
    const pipe = new FilterByNamePipe();
    const result = pipe.transform(unfilteredArray, "ZA");
    expect(result).toEqual(filteredArray);
  });
});
