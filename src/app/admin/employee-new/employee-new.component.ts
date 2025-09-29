import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss'],
  providers:[AuthService]
})
export class EmployeeNewComponent {

   employeeForm!: FormGroup;
  isEdit = false;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      joinedOn: ['', Validators.required],
      gender: ['Male', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      // image: [null]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.employeeId = +params['id'];
        this.service.get(this.employeeId).subscribe(emp => {
          this.employeeForm.patchValue(emp);
        });
      }
    });
  }

  onSubmit() {

    if (this.isEdit) {
      this.service.update(this.employeeId, this.employeeForm.value)
        .subscribe(() => this.router.navigate(['/employees']));
    } else {
      this.service.add(this.employeeForm.value)
        .subscribe(() => this.router.navigate(['/employees']));
    }
  }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   this.employeeForm.patchValue({ image: file });
  // }
}
