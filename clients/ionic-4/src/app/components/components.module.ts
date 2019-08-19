import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class ComponentsModule { }
