import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { CalculateComponent } from './calculate/calculate.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModule } from 'src/app/share/share.module';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    ChartComponent,
    CalculateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    FlexLayoutModule,
    ShareModule
  ]
})
export class ChartModule { }
