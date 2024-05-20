import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHousekeepingComponent } from './manage-housekeeping.component';

describe('ManageHousekeepingComponent', () => {
  let component: ManageHousekeepingComponent;
  let fixture: ComponentFixture<ManageHousekeepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHousekeepingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHousekeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
