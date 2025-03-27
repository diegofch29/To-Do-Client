import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { TaskService } from '../Services/TaskService/task-service.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock TaskService
const mockTaskService = {
  updateTask: jest.fn().mockReturnValue(of({})),
  deleteTask: jest.fn().mockReturnValue(of({}))
};

// Mock MatDialog
const mockDialog = {
  open: jest.fn().mockReturnValue({
    afterClosed: () => of(null)
  })
};

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = {
      id: 1,
      title: 'Test Task',
      isCompleted: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with task input', () => {
    expect(component.task).toBeDefined();
    expect(component.task.id).toBe(1);
  });
});
