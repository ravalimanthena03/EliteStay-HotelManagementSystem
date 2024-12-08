import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusDialogBoxComponent } from './update-status-dialog-box.component';

describe('UpdateStatusDialogBoxComponent', () => {
  let component: UpdateStatusDialogBoxComponent;
  let fixture: ComponentFixture<UpdateStatusDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStatusDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStatusDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
