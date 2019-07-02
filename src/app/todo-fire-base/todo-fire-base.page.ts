import { Http } from '@angular/http';
import { ModalPage } from './../modal/modal.page';
import { UsuarioService } from './../services/usuario.service';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TodolistPage } from '../todolist/todolist.page';

import * as moment from 'moment';

@Component({
  selector: 'app-todo-fire-base',
  templateUrl: './todo-fire-base.page.html',
  styleUrls: ['./todo-fire-base.page.scss']
})
export class TodoFireBasePage implements OnInit {

  public todos = [];
  public userId = '';
  public todosProntos = [];
  public totalTodos = 0;
  public viewCompletos = false;

  constructor(private firebase: FirebaseService,
    private usuario: UsuarioService,
    private alert: AlertController,
    public modal: ModalController,
    private http: Http) {
  }

  async ngOnInit() {
    await this.carregaUser();
    this.visualizaTodos();
  }

  async mostrar() {
    const pagina = await this.modal.create({
      component: ModalPage
    });

    await pagina.present();

    const { data } = await pagina.onDidDismiss();
    const info = data.retorno;
    info.user_id = this.userId;
    await this.adicionar(info);
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
      await this.deletar(t);
      await this.carregaTodos();
    } else {
      await this.atualizar(t, info);
      this.visualizaTodos();
    }
  }

  async carregaUser() {
    await this.usuario.getUser().subscribe((user) => this.userId = user.id);
    // console.log(this.userId);
  }

  async carregaTodos() {
    await this.firebase.db().collection('todos')
      .where('user_id', '==', this.userId)
      .where('status', '==', false)
      .onSnapshot(results => {
        this.todos = [];
        results.docs.forEach(doc => {
          this.todos.push({ id: doc.id, ...doc.data() });
        });
        this.todos.sort(this.date_sort_asc);
      });
  }

  async adicionar(t) {
    delete t.id;
    // console.log(t);
    await this.firebase.db().collection('todos').add(t);
    this.visualizaTodos();
  }

  async atualizar(t, todo) {
    await this.firebase.db().collection('todos').doc(t.id).update({
      activity: todo.activity,
      content: todo.content,
      date: todo.date,
      description: todo.description,
      status: todo.status
    });
    this.visualizaTodos();

  }

  async deletar(t) {
    await this.firebase.db().collection('todos').doc(t.id).delete();
    this.visualizaTodos();
  }

  async carregaTodosProntos() {
    const url = 'https://us-central1-progmobile-79a04.cloudfunctions.net/prontos';
    const headers = {};
    await this.http.get(url, headers).subscribe(
      sucesso => {
        this.todosProntos = [];
        // console.log(sucesso.json());
        sucesso.json().forEach(element => {
          if (element.user_id === this.userId) {
            this.todosProntos.push(element);
            this.todos.push(element);
          }
        });
        console.log(this.todosProntos);
        this.todos.sort(this.date_sort_asc);
      },
      error => {
        console.error(error);
      }
    );
  }

  async carregaTotalTodos() {
    await this.firebase.db().collection('todos').doc('users_count').onSnapshot(element => {
      if (element.data().hasOwnProperty(this.userId)) {
        this.totalTodos = element.data()[this.userId];
      }
    });
  }

  async exibeCompletos() {
    this.viewCompletos = !this.viewCompletos;
    this.visualizaTodos();
  }

  async visualizaTodos() {
    if (this.viewCompletos) {
      await this.carregaTodos();
      await this.carregaTodosProntos();
      await this.carregaTotalTodos();
    } else {
      await this.carregaTodos();
      await this.carregaTotalTodos();
    }
  }

  date_sort_asc = function (a, b) {
    const datea = moment(a.date, 'DD/MM/YYYY').toDate();
    const dateb = moment(b.date, 'DD/MM/YYYY').toDate();
    if (datea > dateb) { return 1; }
    if (datea < dateb) { return -1; }
    return 0;
  };

}
