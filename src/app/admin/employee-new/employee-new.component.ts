import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss'],
  providers:[AuthService]
})
export class EmployeeNewComponent {

  employeeForm!: FormGroup
  constructor(private formBuilder: FormBuilder,private authService:AuthService) {
    this.employeeForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      joinedOn: ['', Validators.required],
      gender: ['Male', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      image: [null]
    })
  }
  onFileChange(event: Event) {

  }
  onSubmit(){
    this.authService.addEmployee(this.employeeForm.value).subscribe((data:any)=>{

    })
  }
}
