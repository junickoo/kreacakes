import { Router } from '@angular/router';
import { ServiceResponseService } from './../response/service-response.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(
    private http: HttpClient,
    private response: ServiceResponseService,
    private router: Router
  ) {}

  checkLogin(username: String, password: String) {
    this.http
      .post('http://localhost:8080/kreas/login-check', {
        username: username,
        password: password,
      })
      .subscribe((data: any) => {
        this.loginChecking(data);
      });
  }

  loginMessage: String = '';
  public isLogin: Boolean = false;

  getIsLogin() {
    return this.isLogin;
  }

  loginChecking(accountDetails: any) {
    if (accountDetails.status == '200') {
      console.log(accountDetails.data);
      sessionStorage.clear();
      var account = accountDetails.data;
      sessionStorage.setItem('username', account.username);
      sessionStorage.setItem('role', account.role);
      sessionStorage.setItem('user_id', account.user_id);
      if (accountDetails.status == '200') {
        sessionStorage.setItem('isLogin', 'true');
      }
      this.router.navigate(['/homepage']);
    } else {
      sessionStorage.clear();
      this.loginMessage = 'Login Failed';
    }

    window.location.reload();
    alert(accountDetails.message);
  }
}
