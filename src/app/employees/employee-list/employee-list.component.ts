import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
    employees: any[] = [];

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service.getAll().subscribe(data => this.employees = data);
  }

  editEmployee(id: number) {
    this.router.navigate(['/admin/employees/new', id]);
  }

  deleteEmployee(id: number) {
    this.service.delete(id).subscribe(() => this.loadEmployees());
  }
}
