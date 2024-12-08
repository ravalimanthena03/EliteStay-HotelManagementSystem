import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-status-dialog-box',
  templateUrl: './update-status-dialog-box.component.html',
  styleUrl: './update-status-dialog-box.component.scss'
})
export class UpdateStatusDialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateStatusDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
