import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';
import { LoginservicesService } from '../../service/loginservices.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  passwordsMatching = false;
  constructor(private fb: FormBuilder, private sign: LoginservicesService, private router: Router, private messageSvc:MessageService) { }


  // click on eye icon and show or hide password

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
      { validators: this.MustMatch('password', 'confirmPassword') });

  }
  //function to match confirmpassword

    MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (
          matchingControl.errors &&
          !matchingControl.errors.MustMatch
        ) {
          return;
        }
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      }};

  onSignup() {
    console.log(this.signUpForm);
    //  if(this.signUpForm.valid){
    console.log(this.signUpForm.value);
    const formData = { ...this.signUpForm.value };
    delete formData.confirmPassword; // Remove confirmPassword from form data
   if(this.signUpForm.valid)
   {
    this.sign.signUp(formData)
    .subscribe({
      next: (res) => {
        localStorage.setItem('fullName', formData.fullName );
        this.messageSvc.success("Sign Up successfull,Please activate you account to continue");
        this.signUpForm.reset();
        console.log(formData);
        this.router.navigate(['userlogin']);
      },
      error: (err) => {
        this.messageSvc.error(err.error.message);
      }
    })
   }
   else
     {
      this.signUpForm.markAllAsTouched();
      return;
     }
 
    //}
    //else {
    //  ValidateForm.validateAllFormFields(this.signUpForm)
    //}
  }

}
