import { async } from '@angular/core/testing';
import { TodolistPage } from './../todolist/todolist.page';
import { ModalPage } from './../modal/modal.page';
import { ModalController } from '@ionic/angular';
import { SqlProvider } from 'ionic-query-interface';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-todo-bd',
  templateUrl: './todo-bd.page.html',
  styleUrls: ['./todo-bd.page.scss'],
})
export class TodoBDPage implements OnInit {

  public todo = [];

  constructor(public db: SqlProvider, public modal: ModalController) {
    this.db.open('minha_base.db');
    this.definirTabela();
    this.carregarTarefas();
  }

  async definirTabela() {
    await this.db.createTable('tarefas', {
      date: 'date',
      activity: 'text',
      description: 'text',
      content: 'text',
      status: 'boolean'
    });
  }

  ngOnInit() {
  }

  async mostrar() {
    const pagina = await this.modal.create({
      component: ModalPage
    });

    await pagina.present();

    const { data } = await pagina.onDidDismiss();
    const info = data.retorno;
    delete info.id;
    const id = await this.db.table('tarefas').insert(info);
    this.todo.push({ id, ...info });
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
    const id = t.id;
    if (info === true) {
      await this.db.table('tarefas').delete({ id });
      await this.carregarTarefas();
    } else {
      await this.db.table('tarefas').update(info);
      await this.carregarTarefas();
    }
  }

  async carregarTarefas() {
    const listaTarefas = await this.db.table('tarefas').all();
    this.todo = [...listaTarefas];
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
