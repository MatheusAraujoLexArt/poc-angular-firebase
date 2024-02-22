import { Injectable, inject, signal } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getFirebaseErrorMessage } from '../utilities/auth-errors';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // constructor() { }
  snackbar = inject(MatSnackBar)
  loading = signal(false);

  showLoading() {
    this.loading.set(true);
  }

  hideLoading() {
    this.loading.set(false);
  }

  success(message: string) {
    this.snackbar.open(message, undefined, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }

  error(message: string) {
    this.snackbar.open(message, 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }

  firebaseError(err: FirebaseError) {
    this.error(getFirebaseErrorMessage(err));
  }
}
