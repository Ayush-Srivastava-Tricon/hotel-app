import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOtaUserComponent } from './manage-ota-user.component';

describe('ManageOtaUserComponent', () => {
  let component: ManageOtaUserComponent;
  let fixture: ComponentFixture<ManageOtaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOtaUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOtaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
