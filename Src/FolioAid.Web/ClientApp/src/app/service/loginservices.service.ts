import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultModel } from '../models/ProjectModel';
import { Uri } from '../shared/url';


@Injectable({
  providedIn: 'root'
})
export class LoginservicesService {

  constructor(private http: HttpClient) { }
  private  _loggedIn = new BehaviorSubject<boolean>(false);
  checkLoggedIn = this._loggedIn.asObservable();
  userlogin(LoginUser: Array<any>) {
    return this.http.post<ResultModel<any>>(Uri.userLogin, {
      Email: LoginUser[0],
     Password: LoginUser[1]
    });
  }

  signUp(userObj: any) {
    return this.http.post<any>(Uri.userSignup, userObj);
  }

  activateString(activeString: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      activationString: activeString
    };

    return this.http.post<any>(Uri.useractivateaccount, body, { headers });
  }

  sendmail(body: any): Observable<Object> {
    return this.http.post(Uri.sendforgotpassword, {
      Email: body[0],
    });

  }

  updateuserpassword(body: any): Observable<Object> {
    return this.http.put(Uri.resetpassword, body);
  }
  setLoggedIn(value: boolean) {
    this._loggedIn.next(value);
    }

  isAuthenticated(){
    var user: any = localStorage.getItem("token");
    if (user) {
      this.setLoggedIn(true);
      return true;
    }
    return false;
  }
 
}
