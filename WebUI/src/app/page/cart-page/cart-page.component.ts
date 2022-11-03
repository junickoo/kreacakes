import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ItemCheckoutService } from './../../service/item-checkout.service';
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DialogOverviewComponent } from 'src/app/layout/dialog-overview/dialog-overview.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  totalPrice: any = 0;
  totalDiscount: any = 0;
  grandTotal: any = 0;
  constructor(
    private itemSevice: ItemCheckoutService,
    private changeDetect: ChangeDetectorRef,
    private dialog: MatDialog,
    private Router: Router
  ) {}

  ngOnInit(): void {
    let userId = sessionStorage.getItem('user_id');
    console.log(userId);
    this.getCartItems(userId);
  }

  getCartItems(userId: any) {
    this.itemSevice
      .cartItems(userId)
      .subscribe((response) => this.setCartItems(response));
  }
  cartItems: any = [{}];
  setCartItems(response: any) {
    console.log(response.message);
    this.cartItems = response.message;
    console.log(this.cartItems);
    this.grandTotal = 0;
    this.totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.totalPrice += this.cartItems[i].price * this.cartItems[i].quantity;
    }
    this.grandTotal = this.totalPrice - this.totalDiscount;
  }
  deleteCartItems(id: any) {
    let userId = sessionStorage.getItem('user_id');
    this.itemSevice
      .deleteCartItems(id, userId)
      .subscribe((data) => this.setCartItems(data));
  }

  public trackItem(index: number, item: any) {
    console.log(item.cart_items_id);
    return item.cart_items_id;
  }
  payCart() {
    let userId = sessionStorage.getItem('user_id');
    this.itemSevice.payCart(userId).subscribe((data) => console.log(data));
    this.itemSevice
      .snapApi(this.totalPrice, this.cartItems[0].cart_id)
      .subscribe((data: any) => {
        window.open(data.redirect_url);
      });

    // const dialogRef = this.dialog.open(DialogOverviewComponent, {
    //   width: '250px',
    //   data: {
    //     type: 'login',
    //     message: 'Payment Success!',
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   window.location.reload();
    // });
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: {
        type: 'login',
        message: 'Payment Success!',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      window.location.reload();
    });
  }
}
