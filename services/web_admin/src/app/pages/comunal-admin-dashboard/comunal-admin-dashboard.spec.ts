import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunalAdminDashboard } from './comunal-admin-dashboard';

describe('ComunalAdminDashboard', () => {
  let component: ComunalAdminDashboard;
  let fixture: ComponentFixture<ComunalAdminDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunalAdminDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunalAdminDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
