import { Component, Input } from '@angular/core';
import { ITask as Task} from '../../ITask';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TaskService } from '../../../../Services/task-service.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  imports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatDialogModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [DatePipe]
})
export class TaskComponent {
  @Input() task: Task = {
    id: 0,
    title: '',
    isCompleted: false,
  };
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  

  formatDate(date: Date) {
    return new DatePipe('en-US').transform(date, 'short');
  }
  
  onEdit() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: { task: this.task, isEdit: true }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(this.task.id, { ...this.task, ...result })
          .subscribe(updatedTask => {
            Object.assign(this.task, updatedTask);
          });
      }
    });
  }

  onDelete() {
    this.taskService.deleteTask(this.task.id).subscribe(() => {
    });
  }

  onComplete() {
    this.taskService.updateTask(this.task.id, {...this.task, isCompleted: true }).subscribe(() => {
      this.task.isCompleted = true;
    });
  }
}
