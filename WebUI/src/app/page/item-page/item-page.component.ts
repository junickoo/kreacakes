import { DialogOverviewComponent } from './../../layout/dialog-overview/dialog-overview.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemCheckoutService } from './../../service/item-checkout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  constructor(
    private itemCheckoutService: ItemCheckoutService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  details = JSON.parse(sessionStorage.getItem('itemDetails') || '{}');
  category = this.details.category;
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
    console.log(response);
    if (response.status.status == 200) {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          type: 'login',
          message: 'Items added to cart!',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        window.location.reload();
      });
    } else {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          type: 'login',
          message: 'Items failed to add!',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        window.location.reload();
      });
    }
  }
  productDisp() {
    this.router.navigateByUrl('display-view');
  }
}
