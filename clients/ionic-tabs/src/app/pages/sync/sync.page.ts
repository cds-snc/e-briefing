import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { File } from '@ionic-native/file/ngx';
import { Zip } from '@ionic-native/zip/ngx';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {

  loading: any;

  constructor(public loadingController: LoadingController, private file: File, private zip: Zip) { }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Attempting to sync data...',
      duration: 5000
    });

    await this.loading.present();
  }

  async syncData() {
    console.log(this.file.dataDirectory);

    await this.presentLoading();

    const token = environment.api_key;
    const url = environment.api_url + '/trips/' + environment.trip_id + '/download';

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    const blob = await response.blob();

    this.file.writeFile(this.file.dataDirectory, "package.zip", blob, { replace: true }).then(_ => {
      this.zip.unzip(this.file.dataDirectory + '/package.zip', this.file.dataDirectory + '/data').then((result) => {
        if (result === 0) { console.log('SUCCESS extracted files to: ' + this.file.dataDirectory); }
        if (result === -1) { console.log('FAILED'); }

        window.location.reload();
      });
    }).then(_ => {
      console.log(this.file.dataDirectory);
      this.file.listDir(this.file.dataDirectory, 'data').then((result) => {
        console.log(result);
      });
    });




    /*
    const token = environment.api_key;
    const url = environment.api_url + '/trips/' + environment.trip_id + '/download';

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        mode: 'no-cors'
      }
    })
      .then(response => {
        return response.blob();
      })
      .then(myBlob => {
        const objectURL = URL.createObjectURL(myBlob);
        console.log(objectURL);
      })
      .catch(error => {
        console.log("ERRROR");
        console.log(error);
      });
      */

    /*
    const myRequest = new Request(environment.api_url + '/trips/' + environment.trip_id + '/download', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(myRequest);
    fetch(myRequest)
      .then(response => {
        return response.blob();
      })
      .then(myBlob => {
        const objectURL = URL.createObjectURL(myBlob);
        console.log(objectURL);
      })
      .catch(error => {
        console.log("ERRROR");
        console.log(error);
      });
      */

  }

}
