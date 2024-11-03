import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule, NzIconService} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NZ_WAVE_GLOBAL_CONFIG} from 'ng-zorro-antd/core/wave';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzCascaderModule} from 'ng-zorro-antd/cascader';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import {
    CoffeeOutline,
    AppstoreOutline,
    InstagramFill,
    TwitterOutline,
    FacebookFill
  } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const importedModules = [
    NzAlertModule,
    NzAutocompleteModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzDividerModule,
    NzDrawerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzModalModule,
    NzDrawerModule,
    NzNotificationModule,
    NzProgressModule,
    NzRadioModule,
    NzSpaceModule,
    NzSpinModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzToolTipModule,
    NzCollapseModule,
    NzImageModule,
    NzBadgeModule,
    NzCascaderModule,
    NzCarouselModule
];

const icons: IconDefinition[] = [
    CoffeeOutline,
    AppstoreOutline,
    FacebookFill,
    InstagramFill,
    TwitterOutline,
  ];
  

@NgModule({
    imports: [CommonModule, NzIconModule.forChild(icons), ...importedModules],
    exports: [...importedModules],
    providers: [
        {
            provide: NZ_WAVE_GLOBAL_CONFIG,
            useValue: {
                disabled: true,
            },
        }
    ],
    
})
export class CustomNgZorroModule {

}
