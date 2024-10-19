import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { CustomNgZorroModule } from './modules/custom-ng-zorro.module';

// type: any[] to usuniecia, tutaj wrzucasz wszystkie komponenty ktore chcesz zeby byly dostepne w tym sharowanym module
const customComponents: any[] = [];

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
