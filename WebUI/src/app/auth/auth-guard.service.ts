import { MatDialog } from '@angular/material/dialog';
import { LoginServiceService } from './../service/login-service.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DialogOverviewComponent } from '../layout/dialog-overview/dialog-overview.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  canActivate() {
    if (
      sessionStorage.getItem('isLogin') == 'true' ||
      window.location.host == 'app.sandbox.midtrans.com'
    ) {
      console.log(window.location.host);
      return true;
    } else {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          type: 'login',
          message: 'Login First',
        },
      });

      dialogRef.afterOpened().subscribe(() => {
        setTimeout(() => {
          dialogRef.close();
        }, 3000);
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.router.navigate(['/login']);
      });
      return false;
    }
  }
}
