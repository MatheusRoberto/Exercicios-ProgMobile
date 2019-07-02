import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodoBDPage } from './todo-bd.page';

const routes: Routes = [
  {
    path: '',
    component: TodoBDPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TodoBDPage],
  entryComponents: []
})
export class TodoBDPageModule {}
