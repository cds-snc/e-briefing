import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-days',
  templateUrl: './days.page.html',
  styleUrls: ['./days.page.scss'],
})
export class DaysPage implements OnInit {

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
