import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginservicesService } from './service/loginservices.service';
import { MessageService } from 'src/app/service/message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor( private route: ActivatedRoute, private loginservices:LoginservicesService,private messageSvc:MessageService,private router:Router){}
  title = 'app';
  ActivationString: any;
  ngOnInit(){
    // Accessing the ActivationString value
    var url=window.location.href;
    this.ActivationString = url.split('activate=')[1];
    console.log(this.ActivationString);
    if (this.ActivationString != null) {
      this.activateAccount();
    }
  }
  
  activateAccount() {
    this.loginservices.activateString(this.ActivationString)
      .subscribe({
        next: (res) => {
          this.messageSvc.success("Your account is activated now ,Please login to continue");
          this.router.navigateByUrl('userlogin');
        },
        error: (err) => {
          this.messageSvc.error(err.error.message);
        }
      })
  }
}
