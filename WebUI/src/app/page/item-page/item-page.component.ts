import { ItemCheckoutService } from './../../service/item-checkout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  constructor(private itemCheckoutService: ItemCheckoutService) {}
  details = JSON.parse(sessionStorage.getItem('itemDetails') || '{}');
  ngOnInit(): void {
    console.log(this.details);
  }
  quantity: number = 1;
  plusQuantity() {
    this.quantity += 1;
  }
  minQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 1;
    }
  }

  addCart() {
    let userId = sessionStorage.getItem('user_id');
    this.itemCheckoutService
      .addCart(userId, this.details.items_id, this.quantity)
      .subscribe((data) => this.validateCart(data));
  }
  validateCart(response: any) {
    if (response.status == 200) {
      alert('Items added to cart!');
    } else {
      alert('Failed to add items to cart');
    }
  }
}
