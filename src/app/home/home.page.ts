import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public habilita = 'Desabilitar';
  public enable = false;

  constructor(public menu: MenuController) { }

  toggleMenu() {
    this.menu.enable(this.enable, 'menu');
    this.habilita = !this.enable ? 'Habilita' : 'Desabilitar';
    this.enable = !this.enable;
  }

  abrir() {
    this.menu.open('menu');
  }
}
