import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  notifications = inject(NotificationService);
  router = inject(Router);

  signUpForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatchValidator() }
  );

  async submit() {
    const { name, email, password, confirmPassword } = this.signUpForm.value;

    if(!this.signUpForm.valid || !name ||  !email || !password || !confirmPassword) {
      return;
    }

    try {
      this.notifications.showLoading();
      const { user } = await this.authService.signUp(email, password);
      await this.authService.setDisplayName(user, name);
      this.router.navigate(['/home']);
      this.notifications.success('User was signed up successfully!');
      this.notifications.hideLoading();
    } catch (error: any) {
      this.notifications.firebaseError(error)
    } finally {
      this.notifications.hideLoading();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }

  name = this.signUpForm.get('name');
  email = this.signUpForm.get('email');
  password = this.signUpForm.get('password');
  confirmPassword = this.signUpForm.get('confirmPassword');
}
