import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
})
export class RecommendationComponent implements OnInit {
  products1 = <product>{};
  products2 = <product>{};
  products3 = <product>{};
  products4 = <product>{};
  productsArray: object[] = [];
  constructor(private Router: Router) {
    this.products1 = {
      name: 'Cookies',
      price: '20.000',
      quan: '6',
      rating: '4,1',
    };
    this.products2 = {
      name: 'Cookies2',
      price: '30.000',
      quan: '16',
      rating: '4,6',
    };
    this.products3 = {
      name: 'Cookies3',
      price: '40.000',
      quan: '',
      rating: '4,5',
    };
    this.products4 = {
      name: 'Cookies4',
      price: '40.000',
      quan: '8',
      rating: '5',
    };
    this.productsArray = [
      this.products1,
      this.products2,
      this.products3,
      this.products4,
    ];
  }

  ngOnInit(): void {}
  itemsCard(details: product) {
    var detailsString = JSON.stringify(details);
    sessionStorage.setItem('itemDetails', detailsString);
    this.Router.navigateByUrl('/item');
  }
}
type product = {
  name: string;
  price: string;
  quan: string;
  rating: string;
};
