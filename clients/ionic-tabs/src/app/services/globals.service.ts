import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";

@Injectable({
  providedIn: "root"
})
export class GlobalsService {
  dataDirectory = "./assets/data";

  constructor(private platform: Platform, private file: File) {
    platform.ready().then(() => {
      console.log("platform ready");
      // if (this.platform.is('ios')) {
      if (this.file.dataDirectory) {
        this.setDataDirectory(this.file.dataDirectory);
      }
    });
  }

  setDataDirectory(value) {
    this.dataDirectory = value;
  }

  getDataDirectory() {
    return this.dataDirectory;
  }

  getStorageDiretory() {
    // get device storage directory
    this.file.dataDirectory;
  }
}
