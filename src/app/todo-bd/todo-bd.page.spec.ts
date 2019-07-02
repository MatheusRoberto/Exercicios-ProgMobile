import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBDPage } from './todo-bd.page';

describe('TodoBDPage', () => {
  let component: TodoBDPage;
  let fixture: ComponentFixture<TodoBDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoBDPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoBDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
