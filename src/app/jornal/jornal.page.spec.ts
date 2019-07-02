import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JornalPage } from './jornal.page';

describe('JornalPage', () => {
  let component: JornalPage;
  let fixture: ComponentFixture<JornalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JornalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JornalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
