import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { UnauthenticatedContentModule } from './unauthenticated-content';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { FooterModule, LoginFormModule } from './shared/components';
import { ApiClient } from './shared/services/http/api-client';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DxListModule, DxRadioGroupModule, DxToolbarModule } from 'devextreme-angular';
import { DxDrawerModule, DxDrawerComponent } from 'devextreme-angular/ui/drawer';

import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
} from './layouts';

import {
  DxTemplateModule,
} from 'devextreme-angular';

import {
  ScreenService,
  AppInfoService,
  AuthService,
  TicketService,
} from './shared/services';

import { CommonComponentsModule } from './shared/components/common/common.module';
import { PagesModule } from './pages/pages.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UnauthenticatedContentModule,
    BrowserTransferStateModule,
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    AppRoutingModule,
    HttpClientModule,

    PagesModule,

    DxTemplateModule,
    DxToolbarModule,
    DxRadioGroupModule,
    DxListModule,
    DxDrawerModule,
    CommonComponentsModule,
  ],
  providers: [
    ApiClient,
    ScreenService,
    AppInfoService,
    AuthService,
    TicketService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiClient, multi: true }
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}