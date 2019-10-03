import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {

  id: any;
  schedule: any;
  scheduleIsLoaded = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    fetch(environment.data_directory + '/days/' + this.id + '.json')
      .then(res => res.json())
      .then(json => {
        this.schedule = json;
        console.log(this.schedule);
        this.scheduleIsLoaded = true;
      });
  }

}
