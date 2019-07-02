import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFireBasePage } from './todo-fire-base.page';

describe('TodoFireBasePage', () => {
  let component: TodoFireBasePage;
  let fixture: ComponentFixture<TodoFireBasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoFireBasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFireBasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
