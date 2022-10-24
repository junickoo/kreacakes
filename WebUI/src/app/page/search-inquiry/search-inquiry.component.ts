import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-inquiry',
  templateUrl: './search-inquiry.component.html',
  styleUrls: ['./search-inquiry.component.css'],
})
export class SearchInquiryComponent implements OnInit {
  constructor(private Router: Router) {}

  dataSource: any;
  ngOnInit(): void {
    this.dataSource = JSON.parse(
      sessionStorage.getItem('search_inquiry') || ''
    );
    console.log(this.dataSource);
  }

  itemsCard(details: any) {
    var detailsString = JSON.stringify(details);
    sessionStorage.setItem('itemDetails', detailsString);
    this.Router.navigateByUrl('/item');
  }
}
