import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario = {};

  constructor(public firebase: FirebaseService, public router: Router) {
    this.getUser().subscribe();
  }

  async login(email, senha) {
    try {
      await this.firebase.auth().signInWithEmailAndPassword(email, senha);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('A senha é inválida');
      } else {
        throw new Error(error.message);
      }
    }
  }

  async registrar(email, senha) {
    try {
      await this.firebase.auth().createUserWithEmailAndPassword(email, senha);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  logout() {
    this.firebase.auth().signOut();
    this.router.navigateByUrl('login');
  }

  getUser(): Observable<any> {
    return Observable.create(async observer => {
      await this.firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.usuario = { id: user.uid, email: user.email, isOnline: true };
        } else {
          this.usuario = { id: null, email: null, isOnline: false };
        }

        observer.next(this.usuario);
      });
    });
  }
}
