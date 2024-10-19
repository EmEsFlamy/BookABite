import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './main.component';


@NgModule({
    declarations: [MainComponent, HomeComponent, MenuComponent],
    imports: [CommonModule, MainRoutingModule, SharedModule],
    providers: [],
    exports: [],
})
export class MainModule {}
