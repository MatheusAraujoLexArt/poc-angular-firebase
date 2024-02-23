import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user';
import { AuthService } from './auth.service';
import { Observable, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
}
