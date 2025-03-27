import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../../Components/NotificationComponent/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    const snackBarRef = this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message,
        panelClass: 'success-snackbar',
        closeSnackbar: () => snackBarRef.dismiss(),
      },
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  showError(message: string) {
    const snackBarRef = this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message,
        panelClass: 'error-snackbar',
        closeSnackbar: () => snackBarRef.dismiss(),
      },
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  showInfo(message: string) {
    const snackBarRef = this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message,
        panelClass: 'info-snackbar',
        closeSnackbar: () => snackBarRef.dismiss(),
      },
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['info-snackbar'],
    });
  }
}
