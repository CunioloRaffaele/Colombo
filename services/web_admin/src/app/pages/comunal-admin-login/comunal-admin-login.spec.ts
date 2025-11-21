import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunalAdminLogin } from './comunal-admin-login';

describe('ComunalAdminLogin', () => {
  let component: ComunalAdminLogin;
  let fixture: ComponentFixture<ComunalAdminLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunalAdminLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunalAdminLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
