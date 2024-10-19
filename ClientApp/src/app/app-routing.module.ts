import { LoginFormComponent } from './shared/components';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services';
import { NgModule } from '@angular/core';
import { 
  DashboardComponent,
  TicketsComponent,
} from './pages';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),
],

  providers: [AuthGuardService],
  exports: [RouterModule,],
  declarations: [
  ],
})
export class AppRoutingModule {}
