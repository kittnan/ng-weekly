import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NgRefComponent } from './ng-ref/ng-ref.component';
import { AdminModule } from './admin.module';
import { GroupTargetComponent } from './group-target/group-target.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalculateComponent } from './calculate/calculate.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ng-ref',
    pathMatch: 'full',
  },
  {
    path: 'ng-ref',
    component: NgRefComponent,
  },
  {
    path: 'group-target',
    component: GroupTargetComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'calculate',
    component: CalculateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
