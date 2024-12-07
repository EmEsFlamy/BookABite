import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { CustomNgZorroModule } from './modules/custom-ng-zorro.module';
import { NavbarComponent } from './components/navbar/navbar.component';

const customComponents = [NavbarComponent];

const importedModules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomNgZorroModule,
];

@NgModule({
    declarations: [...customComponents],
    imports: [RouterModule, ...importedModules],
    providers: [
    ],
    exports: [
        ...importedModules,
        ...customComponents,
    ],
})
export class SharedModule {}
