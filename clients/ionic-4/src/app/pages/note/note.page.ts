import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  id: any;
  note: any;
  isNoteLoaded = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    fetch(environment.data_directory + '/articles/' + this.id + '.json')
      .then(res => res.json())
      .then(json => {
        this.note = json;
        console.log(this.note);
        this.isNoteLoaded = true;
      });
  }

}
