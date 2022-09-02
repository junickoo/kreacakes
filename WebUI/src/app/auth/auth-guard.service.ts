import { LoginServiceService } from './../service/login-service.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  canActivate() {
    if (sessionStorage.getItem('isLogin') == 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      alert('Login First');
      return false;
    }
  }
}
