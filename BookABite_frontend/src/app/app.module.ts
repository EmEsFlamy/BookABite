import {registerLocaleData} from '@angular/common';
import pl from '@angular/common/locales/pl';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { MainModule } from './modules/main/main.module';

import { HttpClientModule } from '@angular/common/http';
import { registerCustomIcons } from './modules/shared/IconService';
import { NzIconService } from 'ng-zorro-antd/icon';

registerLocaleData(pl);

@NgModule({
    declarations: [
        AppComponent],
    imports: [
        // vendor modules
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // project modules
        AppRoutingModule,
        MainModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private iconService: NzIconService) {
        registerCustomIcons(this.iconService);
      }
}
