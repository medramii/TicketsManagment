import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { 
  DashboardComponent, 
} from './';

@NgModule({
  imports: [

  ],
  declarations: [
    DashboardComponent, 
  ],
  exports: [
    DashboardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
