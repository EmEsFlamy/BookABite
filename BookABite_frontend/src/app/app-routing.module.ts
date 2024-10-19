import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
                path: '',
                loadChildren: () => import('./modules/main/main.module').then((m) => m.MainModule),
            },
            {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollOffset: [0, 0],
        }),
    ],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule {}