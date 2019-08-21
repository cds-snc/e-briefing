import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Itinerary',
      url: '/days',
      icon: 'list'
    },
    {
      title: 'People',
      url: '/contacts',
      icon: 'contacts'
    },
    {
      title: 'Documents',
      url: '/documents',
      icon: 'document'
    },
    {
      title: 'Notes',
      url: '/notes',
      icon: 'create'
    },
    {
      title: 'Sync',
      url: '/sync',
      icon: 'sync'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
