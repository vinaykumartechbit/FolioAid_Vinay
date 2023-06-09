import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AccountRoutingModule } from './account.routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SendforgotpasswordmailComponent } from './sendforgotpasswordmail/sendforgotpasswordmail.component';



@NgModule({
  declarations: [
    UserloginComponent,
    SignUpComponent,
    ResetpasswordComponent,
    SendforgotpasswordmailComponent
    
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
