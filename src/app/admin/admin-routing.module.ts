import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeNewComponent } from './employee-new/employee-new.component';


const routes: Routes = [
  { path: 'employees/new', component: EmployeeNewComponent },
  { path: 'employees/new/:id', component: EmployeeNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
