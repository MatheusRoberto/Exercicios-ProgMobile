import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  @Input() id: Number;
  @Input() date: Date;
  @Input() activity: String;
  @Input() description: String;
  @Input() content: String;
  @Input() status: Boolean;
  public dataseleciona: String;

  constructor(public modal: ModalController) { }

  ngOnInit() {
    this.dataseleciona = this.date.toISOString();
  }

  delete() {
    this.modal.dismiss({
      retorno: true
    });
  }

  edit() {
    this.date = moment(this.dataseleciona.toString(), 'YYYY-MM-DD').toDate();
    this.modal.dismiss({
      retorno: {
        id: this.id,
        date: moment(this.date).format('DD/MM/YYYY'),
        activity: this.activity,
        description: this.description,
        content: this.content,
        status: this.status
      }
    });
  }

}
