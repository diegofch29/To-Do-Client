import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { ITask as Task } from '../../Models/ITask';
import { LoadingService } from '../LoadingService/loading.service';
import { environment } from '../../app.config';
import { NotificationService } from '../NotificationService/notification.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl; // Replace with your API URL

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  // Get all tasks
  getTasks(): Observable<Task[]> {
    this.loadingService.show();
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      catchError((error) => {
        const message = 'Error loading tasks';
        this.handleError(error, message);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  getTask(id: number): Observable<Task> {
    this.loadingService.show();
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`).pipe(
      tap(() =>
        this.notificationService.showSuccess('Task loaded successfully')
      ),
      catchError((error) => {
        const message = 'Error loading task';
        this.handleError(error, message);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    this.loadingService.show();
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task).pipe(
      tap(() =>
        this.notificationService.showSuccess('Task created successfully')
      ),
      catchError((error) => {
        const message = 'Error creating task';
        this.handleError(error, message);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    this.loadingService.show();
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task).pipe(
      tap(() =>
        this.notificationService.showSuccess('Task updated successfully')
      ),
      catchError((error) => {
        const message = 'Error updating task';
        this.handleError(error, message);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  deleteTask(id: number): Observable<void> {
    this.loadingService.show();
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`).pipe(
      tap(() =>
        this.notificationService.showSuccess('Task deleted successfully')
      ),
      catchError((error) => {
        const message = 'Error deleting task';
        this.handleError(error, message);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse, message: string) {
    let errorMessage = message;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `${message}: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `${message}: ${error.status} - ${error.message}`;
    }

    this.notificationService.showError(errorMessage);
    console.error(errorMessage);
  }
}
