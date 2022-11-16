import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogOverviewComponent } from '../layout/dialog-overview/dialog-overview.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class RegisterServiceService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}
  registerAcc(
    inUsername: any,
    inPassword: any,
    inEmail: any,
    inRole: any,
    inPhone: any
  ) {
    this.http
      .post('http://localhost:8080/kreas/register-account', {
        username: inUsername,
        password: inPassword,
        email: inEmail,
        role: inRole,
        phone: inPhone,
      })
      .subscribe((data) => this.setRegis(data));
  }

  setRegis(data: any) {
    if (data.status == '200') {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          type: 'login',
          message: 'Register Success!',
        },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        this.router.navigateByUrl('/login');
      });
    } else {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          type: 'login',
          message: 'Register Failed! (' + data.message + ')',
        },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        window.location.reload();
      });

      console.log(data);
    }
  }
}
