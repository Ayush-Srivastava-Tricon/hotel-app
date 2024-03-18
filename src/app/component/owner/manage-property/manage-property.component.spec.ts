import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePropertyComponent } from './manage-property.component';

describe('ManagePropertyComponent', () => {
  let component: ManagePropertyComponent;
  let fixture: ComponentFixture<ManagePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
