import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  constructor() {}
  details = JSON.parse(sessionStorage.getItem('itemDetails') || '{}');
  ngOnInit(): void {}
  quantity: number = 1;
  plusQuantity() {
    this.quantity += 1;
  }
  minQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 1;
    }
  }
}
