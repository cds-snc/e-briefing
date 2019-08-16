import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: any;

  constructor() { }

  ngOnInit() {
    fetch(environment.data_directory + '/people.json')
      .then(res => res.json())
      .then(json => {
        this.contacts = json;
      });
  }

}
