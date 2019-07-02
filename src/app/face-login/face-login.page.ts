import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'face-login',
  templateUrl: './face-login.page.html',
  styleUrls: ['./face-login.page.scss'],
})
export class FaceLoginPage implements OnInit {

  public usuario = {
    logado: false
  };

  constructor(public nav: NavController, public facebook: Facebook, public http: Http) {
    this.checkStatus();
  }

  ngOnInit() {
  }

  async checkStatus() {
    const status = await this.facebook.getLoginStatus();
    if (status.status === 'connected') {
      await this.dadosUsuario();
    } else {
      await this.login();
    }
  }

  async dadosUsuario() {
    const dados = await this.facebook.api(`/me?fields=picture.width(100).height(100),name`, ['public_profile']);
    this.usuario['foto'] = dados.picture.data.url;
    this.usuario['nome'] = dados.name;
    this.usuario['logado'] = true;
  }

  async sair() {
    await this.facebook.logout();
    this.usuario.logado = false;
  }

  async login() {
    const permissions = ['public_profile', 'email'];

    const response = await this.facebook.login(permissions);
    this.usuario['token'] = response.authResponse.accessToken;
    this.usuario['id'] = response.authResponse.userID;
    this.usuario['status'] = response.status;
    await this.dadosUsuario();
  }

}
