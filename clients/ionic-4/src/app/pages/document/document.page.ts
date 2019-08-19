import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {

  id: any;
  document: any;
  pdf: any;
  public isPdfLoaded = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    fetch(environment.data_directory + '/documents/' + this.id + '.json')
      .then(res => res.json())
      .then(json => {
        this.document = json;
        this.pdf = '/assets/data/assets/' + this.document.file;
        this.isPdfLoaded = true;
      });
  }

}
