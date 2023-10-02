import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NgRefComponent } from './ng-ref/ng-ref.component';
import { AdminModule } from './admin.module';

const routes: Routes = [
  {
    path: '',
    component:NgRefComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
