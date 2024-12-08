import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAssignedComponent } from './tasks-assigned.component';

describe('TasksAssignedComponent', () => {
  let component: TasksAssignedComponent;
  let fixture: ComponentFixture<TasksAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksAssignedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
