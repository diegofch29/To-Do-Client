import { Component } from '@angular/core';
import { TaskService } from '../../Services/TaskService/task-service.service';
import { ITask as Task } from '../..//Models/ITask';
import { NgFor } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskComponent, NgFor, MatDialogModule, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getTasks();
  }

  private sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = this.sortTasks(tasks);
    });
  }

  createTask() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.createTask(result).subscribe((newTask) => {
          this.tasks = this.sortTasks([...this.tasks, newTask]);
        });
      }
    });
  }
}
