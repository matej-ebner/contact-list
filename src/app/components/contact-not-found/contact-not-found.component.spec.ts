import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";

import { ContactNotFoundComponent } from "./contact-not-found.component";
import { GeneralService } from "src/app/core-module/services/general.service";
import { RouterModule, Router } from "@angular/router";

describe("ContactNotFoundComponent", () => {
  let component: ContactNotFoundComponent;
  let fixture: ComponentFixture<ContactNotFoundComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactNotFoundComponent],
      imports: [RouterModule.forRoot([])],
      providers: [GeneralService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it("Should create", () => {
    expect(component).toBeTruthy();
  });

  it("Should navigate to '/' on ngOnInit()", fakeAsync(() => {
    const navigateSpy = spyOn(router, "navigate");
    component.ngOnInit();
    tick(2001);
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  }));
});
