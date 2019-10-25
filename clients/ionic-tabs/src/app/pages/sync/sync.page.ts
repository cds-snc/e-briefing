import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { File } from "@ionic-native/file/ngx";
import { Zip } from "@ionic-native/zip/ngx";
import { GlobalsService } from "src/app/services/globals.service";
import { Router } from "@angular/router";
import { syncSingleFiles } from "./utils";

@Component({
  selector: "app-sync",
  templateUrl: "./sync.page.html",
  styleUrls: ["./sync.page.scss"]
})
export class SyncPage implements OnInit {
  loading: any;

  constructor(
    public loadingController: LoadingController,
    private file: File,
    private zip: Zip,
    private globals: GlobalsService,
    private router: Router
  ) {}

  ngOnInit() {}

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Attempting to sync data...",
      duration: 10000
    });

    await this.loading.present();
  }

  async syncData() {
    await this.presentLoading();

    syncSingleFiles(this.file);

    /*
    const token = environment.api_key;
    const url = environment.api_url + '/trips/' + environment.trip_id + '/download';

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    const blob = await response.blob();

    this.file.writeFile(this.globals.dataDirectory, 'package.zip', blob, { replace: true }).then(_ => {
      this.zip.unzip(this.globals.dataDirectory + '/package.zip', this.globals.dataDirectory).then((result) => {
        if (result === 0) { console.log('SUCCESS extracted files to: ' + this.globals.dataDirectory); }
        if (result === -1) { console.log('FAILED'); }

        this.router.navigateByUrl('/');
      });
    }).catch(err => {
      console.log(err);
    });
    */
  }
}
