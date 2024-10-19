import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { 
  DashboardComponent,
  TicketsComponent, 
} from './';
import { DxDataGridModule, DxFormModule, DxLookupModule } from 'devextreme-angular';

@NgModule({
  imports: [
    DxDataGridModule, 
    DxFormModule,
    DxLookupModule
  ],
  declarations: [
    DashboardComponent,
    TicketsComponent,
  ],
  exports: [
    DashboardComponent,
    TicketsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
