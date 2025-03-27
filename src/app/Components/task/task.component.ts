import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask as Task } from '../../Models/ITask';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskService } from '../../Services/TaskService/task-service.service';

@Component({
  selector: 'app-task',
  imports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatDialogModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [DatePipe],
  standalone: true,
})
export class TaskComponent {
  @Input() task: Task = {
    id: 0,
    title: '',
    isCompleted: false,
  };
  @Output() taskChanged = new EventEmitter<void>();
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  formatDate(date: Date) {
    return new DatePipe('en-US').transform(date, 'short');
  }

  onEdit() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: { task: this.task, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService
          .updateTask(this.task.id, { ...this.task, ...result })
          .subscribe((updatedTask) => {
            Object.assign(this.task, updatedTask);
            this.taskChanged.emit();
          });
      }
    });
  }

  onDelete() {
    this.taskService.deleteTask(this.task.id).subscribe(() => {
      this.taskChanged.emit();
    });
  }

  onComplete() {
    this.taskService
      .updateTask(this.task.id, { ...this.task, isCompleted: true })
      .subscribe(() => {
        this.task.isCompleted = true;
        this.taskChanged.emit();
      });
  }
}
