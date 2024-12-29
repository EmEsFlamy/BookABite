import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './main.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { SafeUrlPipe } from '../../safe-url.pipe';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationsListComponent } from './components/reservationsList/reservationsList.component';


@NgModule({
    declarations: [MainComponent, HomeComponent, MenuComponent, LoginComponent, AboutComponent, ContactComponent, SafeUrlPipe, ReservationComponent, ReservationsListComponent],
    imports: [CommonModule, MainRoutingModule, SharedModule],
    providers: [],
    exports: [],
})
export class MainModule {}
