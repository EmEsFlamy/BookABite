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
import { AccountsComponent } from './components/accounts/accounts.component';
import { EditUserDialogComponent } from './components/accounts/edit-user-dialog/edit-user-dialog.component';
import { CreateUserDialogComponent } from './components/accounts/create-user-dialog/create-user-dialog.component';
import { ViewOrderComponent } from './components/reservation/view-order/view-order.component';
import { AssignItemsComponent } from './components/reservation/assign-items/assign-items.component';
import { CheckReservationsComponent } from './components/reservation/check-reservations/check-reservations.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AvailableTableComponent } from './components/reservation/available-table/available-table.component';
import { ChangePasswordComponent } from '../shared/components/navbar/change-password/change-password.component';


@NgModule({
    declarations: [
        MainComponent, 
        HomeComponent, 
        MenuComponent, 
        LoginComponent, 
        AboutComponent, 
        ContactComponent, 
        SafeUrlPipe, 
        ReservationComponent, 
        ReservationsListComponent, 
        AccountsComponent, 
        EditUserDialogComponent, 
        CreateUserDialogComponent,
        ViewOrderComponent,
        AssignItemsComponent,
        CheckReservationsComponent,
        OrdersComponent,
        AvailableTableComponent,
        ChangePasswordComponent],
    imports: [CommonModule, MainRoutingModule, SharedModule],
    providers: [],
    exports: [],
})
export class MainModule {}
