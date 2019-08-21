import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCdsPage } from './about-cds.page';

describe('AboutCdsPage', () => {
  let component: AboutCdsPage;
  let fixture: ComponentFixture<AboutCdsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCdsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCdsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
