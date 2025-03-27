import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ITask } from '../../ITask';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [], // DateAdapter is provided by MatNativeDateModule
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  taskForm: FormGroup;
  modalTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: ITask, isEdit: boolean }
  ) {
    this.modalTitle = data.isEdit ? 'Edit Task' : 'Add New Task';
    this.taskForm = this.fb.group({
      title: [data.task?.title || '', Validators.required],
      description: [data.task?.description || ''],
      dueDate: [data.task?.dueDate || null]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      this.dialogRef.close(formValue);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}