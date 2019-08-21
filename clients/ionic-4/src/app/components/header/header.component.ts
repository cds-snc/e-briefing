import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private ionRouterOutlet: IonRouterOutlet) { }

  ngOnInit() { }

  canGoBack(): boolean {
    return this.ionRouterOutlet.canGoBack();
  }

}
