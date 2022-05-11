import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: firebase.User;

  constructor(private auth: AngularFireAuth,
    private firestore: AngularFirestore) {
    auth.authState.subscribe(user => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    console.log('Login');
    return this.auth.signInWithEmailAndPassword(email,
      password);
  }

  logout(): Promise<any> {
    console.log('LogOut');
    return this.auth.signOut();
  }

  getCurrentUserUid() {
    console.log('CurrentId');
    return this.auth.currentUser;
  }
  isAuthenticated(): boolean {
    return this.auth !== null;
  }
  isAuth() {
    return this.auth.authState.pipe(map(auth => auth));
  }

  searchAdmin(uid: string): Observable<any> {
    return this.firestore.collection('admins', ref => ref.where('uid', '==', uid)).get();
  }


}
