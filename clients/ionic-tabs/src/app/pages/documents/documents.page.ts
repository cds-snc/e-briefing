import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalsService } from 'src/app/services/globals.service';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  documents: any;
  id: any;
  selectedDocument: any;
  keys: string[];

  constructor(private globals: GlobalsService, private platform: Platform, private file: File, private document: DocumentViewer) { }

  ngOnInit() {

  }

  showDocument(id) {
    const options = {
      title: 'PDF'
    };

    this.file.readAsText(this.globals.dataDirectory + 'documents/', id + '.json').then(res => {
      this.selectedDocument = JSON.parse(res);
      this.document.viewDocument(this.globals.dataDirectory + 'assets/' + this.selectedDocument.file, 'application/pdf', options);
    });
  }

  async ionViewWillEnter() {

    await this.platform.ready();

    await this.file.checkFile(this.globals.dataDirectory, 'documents.json')
      .then(_ => console.log('Documents.json exists'))
      .catch(err => console.log(err));

    this.file.readAsText(this.globals.dataDirectory, 'documents.json').then(res => {
      this.documents = JSON.parse(res);
      this.keys = Object.keys(this.documents);
    });
  }
}
