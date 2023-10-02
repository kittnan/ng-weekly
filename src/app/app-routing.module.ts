import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from './pages/chart/chart.module';
import { AdminModule } from './pages/admin/admin.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chart',
    pathMatch: 'full'
  },
  {
    path: 'chart',
    loadChildren: () => ChartModule,
    canActivate: []
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
