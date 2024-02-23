import { Injectable, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  firestore = inject(Firestore);

  createUser(user: ProfileUser): Promise<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return setDoc(ref, user);
  }
}
