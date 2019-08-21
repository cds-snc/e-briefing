import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  id: any;
  event: any;
  eventIsLoaded = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    fetch(environment.data_directory + '/events/' + this.id + '.json')
      .then(res => res.json())
      .then(json => {
        this.event = json;
        console.log(this.event);
        this.eventIsLoaded = true;
      });
  }
}
