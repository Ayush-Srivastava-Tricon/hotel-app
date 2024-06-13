import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultUserSettingComponent } from './default-user-setting.component';

describe('DefaultUserSettingComponent', () => {
  let component: DefaultUserSettingComponent;
  let fixture: ComponentFixture<DefaultUserSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultUserSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
