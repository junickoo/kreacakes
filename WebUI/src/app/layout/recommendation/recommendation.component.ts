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
      items_id: 'itm_2',
      user_id: 'acc_3',
      items_name: 'Cookies Strawberry',
      price: 100000,
      rating_value: 4.5,
      sold_amount: 100,
    };
    this.products2 = {
      items_id: 'itm_2',
      user_id: 'acc_3',
      items_name: 'Cookies Strawberry',
      price: 100000,
      rating_value: 4.5,
      sold_amount: 100,
    };
    this.products3 = {
      items_id: 'itm_2',
      user_id: 'acc_3',
      items_name: 'Cookies Strawberry',
      price: 100000,
      rating_value: 4.5,
      sold_amount: 100,
    };
    this.products4 = {
      items_id: 'itm_2',
      user_id: 'acc_3',
      items_name: 'Cookies Strawberry',
      price: 100000,
      rating_value: 4.5,
      sold_amount: 100,
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
  items_id: string;
  user_id: string;
  items_name: string;
  price: number;
  rating_value: number;
  sold_amount: number;
};
