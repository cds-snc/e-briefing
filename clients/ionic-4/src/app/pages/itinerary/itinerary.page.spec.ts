import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryPage } from './itinerary.page';

describe('ItineraryPage', () => {
  let component: ItineraryPage;
  let fixture: ComponentFixture<ItineraryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
