import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: Number;
  public date: Date;
  public activity: String;
  public description: String;
  public content: String;
  public status: Boolean;

  constructor(public modal: ModalController) { }

  ngOnInit() {
    this.activity = 'Trabalho';
    this.status = false;
  }

  close() {
    this.modal.dismiss({
      retorno: false
    });
  }

  save() {
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
