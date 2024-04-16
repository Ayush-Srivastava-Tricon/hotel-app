import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInternalMappingComponent } from './manage-internal-mapping.component';

describe('ManageInternalMappingComponent', () => {
  let component: ManageInternalMappingComponent;
  let fixture: ComponentFixture<ManageInternalMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInternalMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInternalMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
