import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { MatTableModule } from '@angular/material/table';
import { ITodo } from '../../models/todo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  fb = inject(NonNullableFormBuilder);
  usersService = inject(UsersService);
  authService = inject(AuthService);
  currentUser = this.authService.currentUser$;

  todoForm = this.fb.group({
    description: ['', Validators.required],
  })

  todos: any = [];
  // editingTodoId: string | null = null;
  displayedColumns: string[] = ['createdAt', 'description', 'actions'];

  async ngOnInit(): Promise<void> {
    const userId = this.authService.firebaseAuth.currentUser?.uid;

    if (userId) {
      this.todos = await this.usersService.getTodosByUserId(userId);
    }
  }

  async deleteTodo(todoId: string): Promise<void> {
    await this.usersService.deleteTodoByUserId(todoId)
    .then(async () => {
      const userId = this.authService.firebaseAuth.currentUser?.uid;

      if (userId) {
        this.todos = await this.usersService.getTodosByUserId(userId);
      }
    })
  }

  async createTodo(): Promise<void> {
    const userId = this.authService.firebaseAuth.currentUser?.uid;
    const { description } = this.todoForm.value;
    
    if(userId && description) {
      await this.usersService.createTodo({
        userId: userId,
        description: description,
        createdAt: new Date().toISOString(), 
      })
      .then(async () => {
        // this.todoForm.reset();
        const userId = this.authService.firebaseAuth.currentUser?.uid;
        if (userId) {
          this.todos = await this.usersService.getTodosByUserId(userId);
        }
      })
    }
  }

  formatDate(isoDateString: string): string {
    return new Date(isoDateString).toLocaleDateString("pt-BR");
  }

  // editTodo(todoId: string): void {
  //   this.editingTodoId = todoId;
  // }

  // cancelEdit(): void {
  //   this.editingTodoId = null;
  // }

  // async updateTodo(todoId: string): Promise<void> {
  //   const userId = this.authService.firebaseAuth.currentUser?.uid;
  //   const { description } = this.todoForm.value;
  //   // const todoId = this.editingTodoId;
  //   if(!userId) {
  //     console.log('sem userId')
  //   }
  //   if(!description) {
  //     console.log('sem userId')
  //   }
  //   if(!userId) {
  //     console.log('sem userId')
  //   }
  //   if (userId && description && todoId) {
  //     console.log('entrou')
  //     await this.usersService.updateTodo({
  //       description: description,
  //       id: todoId,
  //     })
  //     .then(async () => {
  //       // this.todoForm.reset();
  //       const userId = this.authService.firebaseAuth.currentUser?.uid;
  //       if (userId) {
  //         this.todos = await this.usersService.getTodosByUserId(userId);
  //       }
  //     })

  //     // Após a atualização, saia do modo de edição
  //     this.editingTodoId = null;
  //   }
  // }

  description = this.todoForm.get('description');
}
