import { Injectable, inject } from '@angular/core';
import { Firestore, collection, deleteDoc, setDoc, doc, docData, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user';
import { AuthService } from './auth.service';
import { Observable, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ITodo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  firestore = inject(Firestore);
  authService = inject(AuthService)

  // observer for async reactivity
  private currentUserProfile$ = this.authService.currentUser$.pipe(
    switchMap((user) => {
      if(!user) {
        return of(null);
      }

      const ref = doc(this.firestore, 'users', user?.uid);
      return docData(ref) as Observable<ProfileUser>
    })
  )

  currentUserProfile = toSignal(this.currentUserProfile$);

  createUser(user: ProfileUser): Promise<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return setDoc(ref, user);
  }

  updateUser(user: ProfileUser) {
    const ref = doc(this.firestore, 'users', user.uid);
    return updateDoc(ref, { ...user });
  }

  async getTodosByUserId(userId: string) {
    const todosArray: any = [];
    const q = query(
      collection(this.firestore, "todos"),
      where("userId", "==", userId)
    );

    const userSnapshot = await getDocs(q);
    userSnapshot.forEach((doc) => {
      if (doc.data()) {
        todosArray.push({
          ...doc.data(),
          id: doc.id,
        })
      }
    });

    return todosArray;
  }

  async deleteTodoByUserId(todoId: string) {
    const todoRef = doc(this.firestore, 'todos', todoId);
    await deleteDoc(todoRef);
  }

  async createTodo(newTodo: {userId: string, description: string, createdAt: string}) {
    const ref = doc(collection(this.firestore, "todos"));
    await setDoc(ref, newTodo);
  }

  // async updateTodo({ description, id } : { id :string, description: string }) {
  //   const ref = doc(collection(this.firestore, "todos", id));
  //   await updateDoc(ref, { description, id });
  // }
}
