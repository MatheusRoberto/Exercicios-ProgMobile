import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login-todo',
  templateUrl: './login-todo.page.html',
  styleUrls: ['./login-todo.page.scss'],
})
export class LoginTodoPage implements OnInit {

  public email = '';
  public senha = '';
  public checkingUser = true;
  public showLoading = false;

  constructor(public usuario: UsuarioService, public router: Router) {
    this.usuario.getUser().subscribe(user => {
      (user.isOnline)
        ? this.router.navigateByUrl('/menu/todo-fire-base')
        : this.checkingUser = false;
    });
  }

  async login() {
    try {
      this.showLoading = true;
      await this.usuario.login(this.email, this.senha);
      this.showLoading = false;
      this.router.navigateByUrl('/menu/todo-fire-base');
    } catch (error) {
      this.showLoading = false;
      console.log(error);
    }
  }

  async registrar() {
    try {
      await this.usuario.registrar(this.email, this.senha);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
  }

}
