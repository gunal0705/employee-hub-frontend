import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    EmployeeListComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule
  ]
})
export class EmployeesModule { }
