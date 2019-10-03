import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  @Input('dayid') dayid;
  @Input('limit') limit;

  itinerary: any;
  itineraryIsLoaded = false;

  constructor() { }

  ngOnInit() {
    fetch(environment.data_directory + '/days/' + this.dayid + '.json')
      .then(res => res.json())
      .then(json => {
        this.itinerary = json;
        this.itineraryIsLoaded = true;
      });
  }
}
