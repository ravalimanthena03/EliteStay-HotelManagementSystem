import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDialogboxComponent } from './review-dialogbox.component';

describe('ReviewDialogboxComponent', () => {
  let component: ReviewDialogboxComponent;
  let fixture: ComponentFixture<ReviewDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewDialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
