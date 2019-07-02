import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodoFireBasePage } from './todo-fire-base.page';

const routes: Routes = [
  {
    path: '',
    component: TodoFireBasePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodoFireBasePage],
  entryComponents: []
})
export class TodoFireBasePageModule {}
