import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePmsComponent } from './manage-pms.component';

describe('ManagePmsComponent', () => {
  let component: ManagePmsComponent;
  let fixture: ComponentFixture<ManagePmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
