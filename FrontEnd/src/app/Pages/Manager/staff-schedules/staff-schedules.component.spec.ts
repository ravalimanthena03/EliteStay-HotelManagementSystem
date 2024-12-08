import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSchedulesComponent } from './staff-schedules.component';

describe('StaffSchedulesComponent', () => {
  let component: StaffSchedulesComponent;
  let fixture: ComponentFixture<StaffSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffSchedulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
