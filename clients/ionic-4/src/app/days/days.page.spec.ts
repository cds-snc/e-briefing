import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysPage } from './days.page';

describe('DaysPage', () => {
  let component: DaysPage;
  let fixture: ComponentFixture<DaysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
