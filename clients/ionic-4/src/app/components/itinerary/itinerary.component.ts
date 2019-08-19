import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss'],
})
export class ItineraryComponent implements OnInit {

  @Input('dayid') dayid;
  @Input('limit') limit;

  itinerary: any;
  itineraryIsLoaded = false;

  constructor() { }

  ngOnInit() {
    console.log(this.dayid);

    fetch(environment.data_directory + '/days/' + this.dayid + '.json')
      .then(res => res.json())
      .then(json => {
        this.itinerary = json;
        this.itineraryIsLoaded = true;
        console.log(this.itinerary);
      });
  }
}
