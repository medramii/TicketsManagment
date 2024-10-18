import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { User } from '../../services/authentication/user.model';
import { Component, NgModule, Input } from '@angular/core';
import { DxListModule } from 'devextreme-angular/ui/list';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from "devextreme-angular";

@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})

export class UserPanelComponent {
  @Input()
  menuItems: any;

  @Input()
  menuMode!: string;

  @Input()
  user!: User | null;

  constructor() {}
}

@NgModule({
  imports: [
    DxListModule,
    DxContextMenuModule,
    CommonModule,
    DxButtonModule
  ],
  declarations: [ UserPanelComponent ],
  exports: [ UserPanelComponent ]
})
export class UserPanelModule { }
