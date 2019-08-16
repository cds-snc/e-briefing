import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
})
export class ComponentsModule { }
