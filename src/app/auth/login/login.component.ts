import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private service:AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  ngOnInit() {
  google.accounts.id.initialize({
    client_id: "194365421195-fefi6kga4f32r0657pki6h2v8m5l4umc.apps.googleusercontent.com",
    callback: (response: any) => this.handleGoogleResponse(response)
  });

  google.accounts.id.renderButton(
    document.getElementById("googleBtn"),
    { theme: "outline", size: "large" }
  );
}
handleGoogleResponse(response: any) {

   const idToken = response.credential;
    console.log(idToken,'idToken')
    this.service.googleLogin(idToken).subscribe({
      next: (res: any) => {
        this.service.setToken(res.token);
        this.router.navigate(['/employees']);
      },
      error: (err:any) => {
        console.error('Google login error', err);
      }
    });
}

  onLogin() {
     if (this.loginForm.invalid) return;
     this.service.login(this.loginForm.value).subscribe((data:any)=>{
        if(data){
            this.service.setToken(data.token);
            this.router.navigate(['/employees']);
        }
     })
  }

}
