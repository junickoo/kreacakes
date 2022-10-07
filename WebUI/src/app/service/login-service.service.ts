import { DialogOverviewComponent } from './../layout/dialog-overview/dialog-overview.component';
import { MatDialog } from '@angular/material/dialog';
import { SellerServiceService } from './seller-service.service';
import { ApiUrl } from 'src/environments/url-list';
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
    private router: Router,
    private seller: SellerServiceService,
    private dialog: MatDialog
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
  redirectUrl: any;

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
      if (account.role == 'customer') {
        this.redirectUrl = '/homepage';
      } else if (account.role == 'seller') {
        this.redirectUrl = '/seller';
      }
      sessionStorage.setItem('user_id', account.user_id);

      if (accountDetails.status == '200') {
        sessionStorage.setItem('isLogin', 'true');
      }
      // this.router.navigate(['/homepage']);
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          type: 'login',
          message: 'Login Success',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.router.navigateByUrl(this.redirectUrl);
      });
    } else {
      sessionStorage.clear();
      this.loginMessage = 'Login Failed';
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          type: 'login',
          message: accountDetails.message,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        window.location.reload();
      });
    }

    // window.location.reload();
    // alert(accountDetails.message);
  }
}
