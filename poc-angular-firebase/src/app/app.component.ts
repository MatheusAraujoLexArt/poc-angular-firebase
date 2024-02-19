import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountFormComponent } from './components/account-form/account-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccountFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poc-angular-firebase';
}
