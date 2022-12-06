import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() productsDetail = <product>{};
  category: any;
  constructor() {}
  ngOnInit(): void {
    console.log(this.productsDetail.category);
    if (this.productsDetail.category == 'birthday_cake') {
      this.category = 'cake';
    } else {
      this.category = this.productsDetail.category;
    }
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
  category: string;
};
