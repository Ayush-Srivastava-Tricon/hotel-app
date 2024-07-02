import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSettingComponent } from './owner-setting.component';

describe('OwnerSettingComponent', () => {
  let component: OwnerSettingComponent;
  let fixture: ComponentFixture<OwnerSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
