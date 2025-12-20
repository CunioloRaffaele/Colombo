import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZones } from './edit-zones';

describe('EditZones', () => {
  let component: EditZones;
  let fixture: ComponentFixture<EditZones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditZones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditZones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
