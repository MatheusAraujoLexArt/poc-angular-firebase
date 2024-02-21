import { Injectable, inject } from '@angular/core';
import { Auth, User, UserCredential, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);

  private currentUser$ = authState(this.firebaseAuth); // variable that changes value at runtime
  currentUser = toSignal(this.currentUser$);

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password)
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth)
  }
}
