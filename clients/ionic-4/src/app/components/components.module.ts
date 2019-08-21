import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ScheduleComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ScheduleComponent
    ]
})
export class ComponentsModule { }
