import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { ItineraryComponent } from '../components/itinerary/itinerary.component';
import { FooterComponent } from '../components/footer/footer.component';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ItineraryComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ItineraryComponent
    ]
})
export class ComponentsModule { }
