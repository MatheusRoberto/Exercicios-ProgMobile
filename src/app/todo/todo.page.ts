import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { TodolistPage } from '../todolist/todolist.page';
import * as moment from 'moment';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  public todo = [];

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  async mostrar() {
    const id = this.todo.length;
    const pagina = await this.modal.create({
      component: ModalPage,
      componentProps: { id: id }
    });

    await pagina.present();

    const { data } = await pagina.onDidDismiss();
    const info = data.retorno;
    this.todo.push(info);
    this.todo.sort(this.date_sort_asc);
  }

  async view(t) {
    const view = await this.modal.create({
      component: TodolistPage,
      componentProps: {
        id: t.id,
        date: moment(t.date, 'DD-MM-YYYY').toDate(),
        activity: t.activity,
        description: t.description,
        content: t.content,
        status: t.status
      }
    });

    await view.present();

    const { data } = await view.onDidDismiss();
    const info = data.retorno;
    if (info === true) {
      this.todo.splice(info.id, 1);
    } else {
      this.todo[info.id] = info;
    }
    this.todo.sort(this.date_sort_asc);
  }

  date_sort_asc = function (a, b) {
    const datea = moment(a.date, 'DD/MM/YYYY').toDate();
    const dateb = moment(b.date, 'DD/MM/YYYY').toDate();
    if (datea > dateb) { return 1; }
    if (datea < dateb) { return -1; }
    return 0;
  };

}
