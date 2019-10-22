import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GlobalsService } from 'src/app/services/globals.service';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  id: any;
  contact: any;
  imgPath: string;
  contactIsLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private globals: GlobalsService,
    private file: File,
    private webview: WebView,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.imgPath = this.webview.convertFileSrc(this.globals.dataDirectory + 'assets/');

    await this.platform.ready();

    this.file.readAsText(this.globals.dataDirectory + 'people/', this.id + '.json').then(res => {
      this.contact = JSON.parse(res);
      this.contactIsLoaded = true;

      this.file.checkFile(this.imgPath, this.contact.image)
        .then(_ => console.log('Image file exists'))
        .catch(err => console.log(err));
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(this.globals.dataDirectory + 'assets/' + img);
      const safeImg = this.sanitizer.bypassSecurityTrustUrl(converted);
      return safeImg;
    }
  }

}
