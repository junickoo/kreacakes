import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() productsDetail = <product>{};
  constructor() {
    this.productsDetail.items_name = 'test';
  }
  ngOnInit(): void {}
}

type product = {
  items_id: string;
  user_id: string;
  items_name: string;
  price: number;
  rating_value: number;
  sold_amount: number;
};
