import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { ItineraryComponent } from '../components/itinerary/itinerary.component';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HeaderComponent,
        ItineraryComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        HeaderComponent,
        ItineraryComponent
    ]
})
export class ComponentsModule { }
