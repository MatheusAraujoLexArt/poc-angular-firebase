import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  fb = inject(FormBuilder);
  usersService = inject(UsersService);

  profileForm = this.fb.group({
    uuid: [''],
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

  saveProfile() {
    console.log('')
  }
}
