import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NgRefComponent } from './ng-ref/ng-ref.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    AdminComponent,
    NgRefComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    ShareModule
  ]
})
export class AdminModule { }
