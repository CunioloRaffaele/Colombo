import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunalAdminRegistration } from './comunal-admin-registration';

describe('ComunalAdminRegistration', () => {
  let component: ComunalAdminRegistration;
  let fixture: ComponentFixture<ComunalAdminRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunalAdminRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunalAdminRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
