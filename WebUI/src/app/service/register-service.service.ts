import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterServiceService {
  constructor(private http: HttpClient) {}
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
      sessionStorage.setItem('isRegister', 'true');
      alert(data.message);
      window.location.reload();
    } else {
      sessionStorage.setItem('isRegister', 'false');
    }
  }
}
