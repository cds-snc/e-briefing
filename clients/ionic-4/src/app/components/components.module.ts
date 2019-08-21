import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ScheduleComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ScheduleComponent
    ]
})
export class ComponentsModule { }
