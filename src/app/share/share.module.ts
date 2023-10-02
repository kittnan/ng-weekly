import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeadComponent } from './sub-head/sub-head.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    SubHeadComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports:[
    SubHeadComponent,
    MaterialModule
  ]
})
export class ShareModule { }
