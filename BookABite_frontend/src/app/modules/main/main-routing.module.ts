import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './main.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationsListComponent } from './components/reservationsList/reservationsList.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        data: {breadcrumb: null},
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'menu',
                component: MenuComponent,
            },
            {
                path: 'about',
                component: AboutComponent,
            },
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'reservation',
                component: ReservationComponent,
            },
            {
                path: 'reservation/all',
                component: ReservationsListComponent,
            },
            {
                path: 'accounts',
                component: AccountsComponent,
            },
            {
                path: 'orders/all',
                component: OrdersComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
