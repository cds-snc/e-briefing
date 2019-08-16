import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  documents: any;
  keys: string[];

  constructor() { }

  ngOnInit() {
    fetch(environment.data_directory + '/documents.json')
      .then(res => res.json())
      .then(json => {
        this.documents = json;
        this.keys = Object.keys(this.documents);
      });
  }

}
