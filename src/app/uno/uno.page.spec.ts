import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnoPage } from './uno.page';

describe('UnoPage', () => {
  let component: UnoPage;
  let fixture: ComponentFixture<UnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
