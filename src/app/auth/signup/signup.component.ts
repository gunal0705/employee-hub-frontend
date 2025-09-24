import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers:[AuthService]
})
export class SignupComponent {
  signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: AuthService) {
      this.signupForm=this.formBuilder.group({
          fullName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
      })
  }

  onSignup() {
    if (this.signupForm.invalid) return;
    this.service.register(this.signupForm.value).subscribe((data:any)=>{
     if(data){
         this.router.navigate(['/login']);
     }
    })
  }
}
