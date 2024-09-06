import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

const importedModules = [
    NzCarouselModule,
];

@NgModule({
    imports: [
        CommonModule,
        ...importedModules,
    ],
    exports: [
        ...importedModules,
    ],
})

export class ImportModule {
}