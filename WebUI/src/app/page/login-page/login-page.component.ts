import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkIsLogin();
  }
  checkIsLogin() {
    if (sessionStorage.getItem('isLogin') == 'true') {
      console.log(sessionStorage.getItem('isLogin'));
      this.router.navigateByUrl('/homepage');
    }
  }
  loginAccount(username: any, password: any) {
    this.loginService.checkLogin(username.value, password.value);
  }
  test() {
    console.log('TEST');
  }
}
