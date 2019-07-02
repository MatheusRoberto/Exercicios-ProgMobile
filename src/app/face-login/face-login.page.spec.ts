import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceLoginPage } from './face-login.page';

describe('FaceLoginPage', () => {
  let component: FaceLoginPage;
  let fixture: ComponentFixture<FaceLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
