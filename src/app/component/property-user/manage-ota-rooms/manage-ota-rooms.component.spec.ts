import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOtaRoomsComponent } from './manage-ota-rooms.component';

describe('ManageOtaRoomsComponent', () => {
  let component: ManageOtaRoomsComponent;
  let fixture: ComponentFixture<ManageOtaRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOtaRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOtaRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
