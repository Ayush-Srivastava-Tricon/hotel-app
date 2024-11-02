import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDiscountOfferComponent } from './manage-discount-offer.component';

describe('ManageDiscountOfferComponent', () => {
  let component: ManageDiscountOfferComponent;
  let fixture: ComponentFixture<ManageDiscountOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDiscountOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDiscountOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
