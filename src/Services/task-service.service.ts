import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ITask as Task} from '../app/src/ITask';
import { environment } from '../app/app.config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    console.log("get tasks");
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get a single task by ID
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new task
  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a task
  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a task
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}