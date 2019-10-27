import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { syncSingleFiles } from "./utils";
@Component({
  selector: "app-sync",
  templateUrl: "./sync.page.html",
  styleUrls: ["./sync.page.scss"]
})
export class SyncPage implements OnInit {
  loading: any;

  constructor(public loadingController: LoadingController) {}

  ngOnInit() {}

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Attempting to sync data...",
      duration: 30000
    });

    await this.loading.present();
  }

  async syncData() {
    await this.presentLoading();
    await syncSingleFiles();
  }
}
