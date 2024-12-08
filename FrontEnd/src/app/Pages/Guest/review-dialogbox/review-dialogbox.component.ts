import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-review-dialogbox',
  templateUrl: './review-dialogbox.component.html',
  styleUrl: './review-dialogbox.component.scss'
})
export class ReviewDialogboxComponent {
  feedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReviewDialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: string }
  ) {
    this.feedbackForm = this.fb.group({
      serviceRating: [null, Validators.required],
      diningRating: [null, Validators.required],
      staffRating: [null, Validators.required],
      overallRating: [null, Validators.required],
      comments: ['', Validators.required],
    });
  }

  submitFeedback(): void {
    if (this.feedbackForm.valid) {
      const feedbackData = {
        roomId: this.data.roomId,
        ...this.feedbackForm.value,
        reviewDate:new Date()
      };
      this.dialogRef.close(feedbackData); // Return feedback data to parent component
    }
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close without submitting
  }
}
