import { Component } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { TaskService } from '../../../../Services/task-service.service';
import { ITask as Task} from '../../ITask';
import { NgFor } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskModalComponent } from '../task-modal/task-modal.component';


@Component({
  selector: 'app-task-list',
  imports: [TaskComponent,NgFor,MatDialogModule,MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}  
  
  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    return this.taskService.getTasks().subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  createTask() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: { isEdit: false }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(result).subscribe(newTask => {
          this.tasks = [...this.tasks, newTask];
        });
      }
    });
  }

}
