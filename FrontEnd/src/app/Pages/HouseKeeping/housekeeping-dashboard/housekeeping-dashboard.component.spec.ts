import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousekeepingDashboardComponent } from './housekeeping-dashboard.component';

describe('HousekeepingDashboardComponent', () => {
  let component: HousekeepingDashboardComponent;
  let fixture: ComponentFixture<HousekeepingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousekeepingDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HousekeepingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
