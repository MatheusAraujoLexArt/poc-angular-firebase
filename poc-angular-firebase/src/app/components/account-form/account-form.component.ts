import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})

// export class AccountFormComponent {
//  // se der algum erro, voltar com essa classe
// }

export class AccountFormComponent implements OnInit  {
  userForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  get email() {
    return this.userForm.get('email')!;
  }

  get password() {
    return this.userForm.get('password')!;
  }

  title = 'teste';
  submit() {
    console.log('Enviou formulario')
  }
}
