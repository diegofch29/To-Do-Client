import { Component } from '@angular/core';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { SpinnerComponent } from './Components/loading/loading.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, SpinnerComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'to-do-client';
}
