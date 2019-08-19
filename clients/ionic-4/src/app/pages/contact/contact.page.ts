import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  id: any;
  contact: any;
  contactIsLoaded = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    fetch(environment.data_directory + '/people/' + this.id + '.json')
      .then(res => res.json())
      .then(json => {
        this.contact = json;
        this.contactIsLoaded = true;
        console.log(this.contact);
      });
  }

}
