import { AutenticacaoGuard } from './../guards/autenticacao.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '', redirectTo: '/menu/home', pathMatch: 'full'
  },
  {
    path: '', component: MenuPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'persons', loadChildren: '../persons/persons.module#PersonsPageModule' },
      { path: 'login', loadChildren: '../login/login.module#LoginPageModule' },
      { path: 'tarefa', loadChildren: '../tarefa/tarefa.module#TarefaPageModule' },
      { path: 'mensagem', loadChildren: '../mensagem/mensagem.module#MensagemPageModule' },
      { path: 'uno', loadChildren: '../uno/uno.module#UnoPageModule' },
      { path: 'card', loadChildren: '../card/card.module#CardPageModule' },
      { path: 'todo', loadChildren: '../todo/todo.module#TodoPageModule' },
      { path: 'modal', loadChildren: '../modal/modal.module#ModalPageModule' },
      { path: 'todolist', loadChildren: '../todolist/todolist.module#TodolistPageModule' },
      { path: 'todo-bd', loadChildren: '../todo-bd/todo-bd.module#TodoBDPageModule' },
      {
        path: 'todo-fire-base', loadChildren: '../todo-fire-base/todo-fire-base.module#TodoFireBasePageModule',
        canActivate: [AutenticacaoGuard]
      },
      { path: 'login-todo', loadChildren: '../login-todo/login-todo.module#LoginTodoPageModule' },
      { path: 'jornal', loadChildren: '../jornal/jornal.module#JornalPageModule' },
      { path: 'jornal/:id', loadChildren: '../jornal/jornal.module#JornalPageModule' },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
