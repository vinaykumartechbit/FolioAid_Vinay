import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginservicesService } from '../../service/loginservices.service';
import { MessageService } from 'src/app/service/message.service';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { SendforgotpasswordmailComponent } from '../sendforgotpasswordmail/sendforgotpasswordmail.component';
const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  passwordsMatching = false;
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  constructor(private loginservices: LoginservicesService, private messageSvc: MessageService,private router: Router, private dialog: MatDialog) {
    this.loginservices.setLoggedIn(false);
  }

  

  ngOnInit(){}

  get UserEmail(): FormControl {
    return this.loginform.get("useremail") as FormControl
  }
  get UserPassword(): FormControl {
    return this.loginform.get("password") as FormControl
  }


  loginform = new FormGroup({
    useremail: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
   
  });
  isUserValid: boolean = false;


  loginsubmited() {
    if (this.loginform.valid) {
      this.loginservices.userlogin([
        this.loginform.value.useremail,
        this.loginform.value.password
      ]).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.result.token);
          this.messageSvc.success("Log in successfully");
          this.loginservices.setLoggedIn(true);
          this.router.navigate(['project-listing']);
          
        },
        error: (err) => {
          this.messageSvc.error(err.error.message);
        }
      }
      )
    }
    else {
      this.loginform.markAllAsTouched();

    }
  }

  }
  

