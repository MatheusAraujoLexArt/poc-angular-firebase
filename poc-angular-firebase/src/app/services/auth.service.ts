import { Injectable, inject } from '@angular/core';
import { Auth, User, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);

  currentUser$ = authState(this.firebaseAuth); // variable that changes value at runtime
  currentUser = toSignal(this.currentUser$);

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password)
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  setDisplayName(user: User, name: string): Promise<void> {
    return updateProfile(user, { displayName: name });
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth)
  }
}
