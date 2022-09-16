import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() productsDetail = <product>{};
  constructor() {
    this.productsDetail.name = 'test';
  }
  ngOnInit(): void {}
}

type product = {
  name: string;
  price: string;
  quan: string;
  rating: string;
};
