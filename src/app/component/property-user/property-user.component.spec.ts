import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUserComponent } from './property-user.component';

describe('PropertyUserComponent', () => {
  let component: PropertyUserComponent;
  let fixture: ComponentFixture<PropertyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
