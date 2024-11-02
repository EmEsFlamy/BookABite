import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './main.component';
import { AboutComponent } from './components/about/about.component';

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
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
