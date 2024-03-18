import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOwnerComponent } from './manage-owner.component';

describe('ManageUserComponent', () => {
  let component: ManageOwnerComponent;
  let fixture: ComponentFixture<ManageOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
