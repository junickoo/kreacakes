import { RecommendationServiceService } from './../../service/recommendation-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
})
export class RecommendationComponent implements OnInit {
  products1: any;
  products2: any;
  products3: any;
  products4: any;
  productsArray: object[] = [];
  constructor(
    private Router: Router,
    private recommendation: RecommendationServiceService
  ) {
    this.products1 = {
      items_id: '',
      user_id: '',
      items_name: '',
      price: 0,
      rating_value: 4.5,
      sold_amount: 0,
    };
    this.products2 = {
      items_id: '',
      user_id: '',
      items_name: '',
      price: 0,
      rating_value: 4.5,
      sold_amount: 0,
    };
    this.products3 = {
      items_id: '',
      user_id: '',
      items_name: '',
      price: 0,
      rating_value: 4.5,
      sold_amount: 0,
    };
    this.products4 = {
      items_id: '',
      user_id: '',
      items_name: '',
      price: 0,
      rating_value: 4.5,
      sold_amount: 0,
    };
    this.productsArray = [
      this.products1,
      this.products2,
      this.products3,
      this.products4,
    ];
  }

  ngOnInit(): void {
    this.recommendation
      .recommendationItems()
      .subscribe((resp) => this.setProductArray(resp));
  }

  setProductArray(response: any) {
    this.productsArray = response.message;
    this.products1 = this.productsArray[0];
    this.products2 = this.productsArray[1];
    this.products3 = this.productsArray[2];
    this.products4 = this.productsArray[3];
    console.log(this.productsArray);
  }
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
  metadata: string;
  username: string;
};
