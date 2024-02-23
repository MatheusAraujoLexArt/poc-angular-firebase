import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NotificationService } from './services/notification.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poc-angular-firebase';
  router = inject(Router);
  notificationService = inject(NotificationService);
  authService = inject(AuthService);
  usersService = inject(UsersService);

  loading = this.notificationService.loading;
  currentUser = this.usersService.currentUserProfile;

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
