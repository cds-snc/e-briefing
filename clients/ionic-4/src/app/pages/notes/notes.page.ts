import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  notes: any;

  constructor() { }

  ngOnInit() {
    fetch(environment.data_directory + '/articles.json')
      .then(res => res.json())
      .then(json => {
        this.notes = json;
      });
  }

}
