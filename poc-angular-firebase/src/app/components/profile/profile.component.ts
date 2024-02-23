import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  fb = inject(NonNullableFormBuilder);
  usersService = inject(UsersService);
  notifications = inject(NotificationService);

  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
  })

  constructor() {
    // called every time signal changes or updates
    effect(() => {
      this.profileForm.patchValue({ ...this.usersService.currentUserProfile() })
    })
  }

  async saveProfile() {
    const { uid, ...data } = this.profileForm.value;

    if(!uid) {
      return;
    }

    try {
      this.notifications.showLoading();
      await this.usersService.updateUser({ uid, ...data });
      this.notifications.success('Profile updated successfully!')
    } catch (error: any) {
      this.notifications.firebaseError(error)
    } finally {
      this.notifications.hideLoading();
    }
  }
}
