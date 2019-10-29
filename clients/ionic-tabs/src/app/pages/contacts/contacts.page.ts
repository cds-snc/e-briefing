import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { GlobalsService } from "src/app/services/globals.service";
import { File } from "@ionic-native/file/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.page.html",
  styleUrls: ["./contacts.page.scss"]
})
export class ContactsPage implements OnInit {
  contacts: any;
  imgPath: string;

  constructor(
    private platform: Platform,
    private globals: GlobalsService,
    private file: File,
    private webview: WebView,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.platform.ready();

    this.imgPath = this.webview.convertFileSrc(this.globals.dataDirectory);

    await this.file
      .checkFile(this.globals.dataDirectory, "people.json")
      .then(_ => console.log("People.json exists"))
      .catch(err => console.log(err));

    this.file
      .readAsText(this.globals.dataDirectory, "people.json")
      .then(res => {
        this.contacts = JSON.parse(res);
      });
  }

  pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      const arr = img.split("/");
      const fileName = arr[arr.length - 1];

      const converted = this.webview.convertFileSrc(
        `${this.globals.dataDirectory}/${fileName}`
      );
      const safeImg = this.sanitizer.bypassSecurityTrustUrl(converted);
      return safeImg;
    }
  }
}
