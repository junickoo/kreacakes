import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  homeLink() {
    this.router.navigateByUrl('/homepage');
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }
}
