import { Router } from '@angular/router';
import { RegisterServiceService } from './../../service/register-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private register: RegisterServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isRegist();
  }

  isRegist() {
    if (sessionStorage.getItem('isRegister') == 'true') {
      sessionStorage.setItem('isRegister', 'false');
      console.log('register sukses');
      this.router.navigateByUrl('/login');
    }
  }

  registerAccount(
    username: any,
    password: any,
    email: any,
    phone: any,
    role: any
  ) {
    console.log(
      username.value +
        ' ' +
        password.value +
        ' ' +
        email.value +
        ' ' +
        phone.value +
        ' ' +
        role.value
    );
    this.register.registerAcc(
      username.value,
      password.value,
      email.value,
      role.value,
      phone.value
    );
  }
}
