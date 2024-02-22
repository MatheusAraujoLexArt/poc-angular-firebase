import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  notifications = inject(NotificationService);
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async login() {
    const { email, password } = this.loginForm.value;

    if(!this.loginForm.valid || !email || !password) {
      return;
    }

    try {
      this.notifications.showLoading();
      await this.authService.login(email, password);
      this.router.navigate(['/home']);
      this.notifications.success('Logged in successfully!')
      this.notifications.hideLoading();
    } catch (error: any) {
      this.notifications.firebaseError(error)
    } finally {
      this.notifications.hideLoading();
    }

  }

  email = this.loginForm.get('email');
  password = this.loginForm.get('password');
}
