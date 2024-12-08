import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceRequestsService } from '../../../Services/service-requests.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrl: './schedule-form.component.scss'
})
export class ScheduleFormComponent implements OnInit{
  scheduleForm!: FormGroup;
  shiftOptions = [
    { value: 'Morning', label: 'Morning' },
    { value: 'Afternoon', label: 'Afternoon' },
    { value: 'Night', label: 'Night' }
  ];
  availableStaff: any[] = []; // Assume you fetch this from the API

  isEditMode: boolean = false; // Toggle for editing mode

  constructor(
    private fb: FormBuilder,
    private serviceRequestsService: ServiceRequestsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAvailableStaff(); // Load staff data
  }

  initForm() {
    this.scheduleForm = this.fb.group({
      staffId: ['', Validators.required],
      shiftType: ['', Validators.required],
      shiftStartTime: [{ value: '', disabled: false }, Validators.required],
      shiftEndTime: [{ value: '', disabled: false }, Validators.required]
    });

    // Check if editing an existing schedule (if applicable)
    // You can fetch and prefill the form data for editing
    if (this.isEditMode) {
      // Prepopulate the form with existing data (for edit)
    }
  }

  loadAvailableStaff() {
    this.serviceRequestsService.getStaffOfHousekeeping().subscribe((staff: any) => {
      this.availableStaff = staff;
    });
  }

  onShiftChange() {
    const shiftType = this.scheduleForm.get('shiftType')?.value;
    let startTime: Date;
    let endTime: Date;

    // Set shift start and end times based on shift type
    const now = new Date();

    switch (shiftType) {
      case 'Morning':
        startTime = new Date(now.setHours(6, 0, 0, 0)); // 6:00 AM
        endTime = new Date(now.setHours(14, 0, 0, 0));  // 2:00 PM
        break;
      case 'Afternoon':
        startTime = new Date(now.setHours(14, 0, 0, 0)); // 2:00 PM
        endTime = new Date(now.setHours(22, 0, 0, 0));  // 10:00 PM
        break;
      case 'Night':
        startTime = new Date(now.setHours(22, 0, 0, 0)); // 10:00 PM
        endTime = new Date(now.setHours(6, 0, 0, 0));   // 6:00 AM (next day)
        break;
      default:
        startTime = new Date();
        endTime = new Date();
    }

    // Update form with selected times (ISO format)
    this.scheduleForm.patchValue({
      shiftStartTime: startTime.toISOString(),
      shiftEndTime: endTime.toISOString()
    });
  }

  submitForm() {
    if (this.scheduleForm.invalid) {
      return;
    }

    const formValues = this.scheduleForm.value;
    const payload = {
      staffId: formValues.staffId,
      shiftType: formValues.shiftType,
      shiftStartTime: formValues.shiftStartTime,  // ISO format
      shiftEndTime: formValues.shiftEndTime,      // ISO format
      taskIds: [],                               // Empty for now, you can modify as needed
      status: 'Assigned'                         // Adjust the status if needed
    };

    // Call the service to create or update the schedule
    if (this.isEditMode) {
      this.serviceRequestsService.updateStaffSchedule(payload).subscribe((response:string) => {
        console.log('Schedule updated:', response);
        this.router.navigate(['/schedules']);
      });
    } else {
      this.serviceRequestsService.createStaffSchedule(payload).subscribe((response :string)=> {
        console.log('Schedule created:', response);
        this.router.navigate(['/schedules']);
      });
    }
  }
}
