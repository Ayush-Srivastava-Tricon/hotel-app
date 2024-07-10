import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsCalendarComponent } from './pms-calendar.component';

describe('PmsCalendarComponent', () => {
  let component: PmsCalendarComponent;
  let fixture: ComponentFixture<PmsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
