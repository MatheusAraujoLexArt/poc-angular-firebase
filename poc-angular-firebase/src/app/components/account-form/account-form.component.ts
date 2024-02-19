import { Component } from '@angular/core';

@Component({
  selector: 'app-account-form',
  standalone: true,
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'] // Alteração para styleUrls e fornecimento de um array
})
export class AccountFormComponent {
  title = 'teste';
}
