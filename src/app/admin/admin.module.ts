import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeNewComponent } from './employee-new/employee-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
@NgModule({
  declarations: [
    EmployeeNewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
