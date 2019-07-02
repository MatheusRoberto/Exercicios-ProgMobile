import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTodoPage } from './login-todo.page';

describe('LoginTodoPage', () => {
  let component: LoginTodoPage;
  let fixture: ComponentFixture<LoginTodoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTodoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
