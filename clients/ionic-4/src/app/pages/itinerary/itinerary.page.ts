import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.page.html',
  styleUrls: ['./itinerary.page.scss'],
})
export class ItineraryPage implements OnInit {

  days: any;
  binder: any;

  constructor() { }

  ngOnInit() {
    fetch(environment.data_directory + '/days.json')
      .then(res => res.json())
      .then(json => {
        this.days = json;
      });

    fetch(environment.data_directory + '/binder.json')
      .then(res => res.json())
      .then(json => {
        this.binder = json;
      });
  }

}
