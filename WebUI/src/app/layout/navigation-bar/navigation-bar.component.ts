import { ApiUrl } from 'src/environments/url-list';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  query: any;
  ngOnInit(): void {
    this.query = sessionStorage.getItem('search_query');
  }

  homeLink() {
    this.router.navigateByUrl('/homepage');
  }

  searchQuery(query: any) {
    this.http
      .post(ApiUrl.getSearch, {
        query: query.value,
      })
      .subscribe((resp: any) => {
        console.log(resp);
        sessionStorage.setItem('search_inquiry', JSON.stringify(resp.message));
        sessionStorage.setItem('search_query', query.value);
      });
    console.log(query.value);

    if ((window.location.hash = '#/search-inquiry')) {
      window.location.reload();
    }
    this.router.navigateByUrl('/search-inquiry');
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }
  history() {
    this.router.navigateByUrl('/history');
  }
}
