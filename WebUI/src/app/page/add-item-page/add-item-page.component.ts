import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SellerServiceService } from './../../service/seller-service.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogOverviewComponent } from 'src/app/layout/dialog-overview/dialog-overview.component';

@Component({
  selector: 'app-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.css'],
})
export class AddItemPageComponent implements OnInit {
  pageConfig: any;
  categoryList: any;
  minValue = 1000;
  constructor(
    private http: HttpClient,
    private seller: SellerServiceService,
    private Router: Router,
    private dialog: MatDialog
  ) {
    this.pageConfig = window.location.hash;
    this.seller.getCategory().subscribe((data: any) => {
      this.categoryList = data.message;
    });
  }

  ngOnInit(): void {}

  userId = sessionStorage.getItem('user_id');
  detailsItem = sessionStorage.getItem('detailsItem');

  object: Details = JSON.parse(this.detailsItem || '{}');

  // addItem(name: any, category: any, price: any, metadata: any) {
  //   console.log(category.value);
  //   this.seller
  //     .addItems(name.value, category.value, price.value, this.userId, metadata)
  //     .subscribe((data: any) => {
  //       if (data.status == '200') {
  //         const dialogRef = this.dialog.open(DialogOverviewComponent, {
  //           width: '500px',
  //           height: '500px',
  //           data: {
  //             type: 'message-only',
  //             message: 'Items Added!',
  //           },
  //           panelClass: 'myClass',
  //         });

  //         dialogRef.afterOpened().subscribe(() =>
  //           setTimeout(() => {
  //             dialogRef.close();
  //           }, 1500)
  //         );

  //         dialogRef.afterClosed().subscribe((result) => {
  //           this.Router.navigateByUrl('/seller');
  //         });
  //       }
  //     });
  // }

  addItem(name: any, category: any, price: any) {
    var detailsAddItem = {
      userId: this.userId,
      price: price.value,
      category: category.value,
      itemsName: name.value,
    };
    if (price.value > 999) {
      sessionStorage.setItem('detailsAddItem', JSON.stringify(detailsAddItem));
      this.Router.navigateByUrl('/display-builder');
    } else {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '200px',
        height: '200px',
        data: {
          type: 'message-only',
          message: 'Price Minimum Rp. 1.000,-',
        },
        panelClass: 'myClass',
      });

      dialogRef.afterOpened().subscribe(() =>
        setTimeout(() => {
          dialogRef.close();
        }, 1500)
      );
    }
  }
  editItem(name: any, category: any, price: any) {
    let items_id = this.object.items_id;
    if (price.value > 999) {
      this.seller
        .editItems(items_id, name.value, category.value, price.value)
        .subscribe((data: any) => {
          if (data.status == '200') {
            const dialogRef = this.dialog.open(DialogOverviewComponent, {
              width: '200px',
              height: '200px',
              data: {
                type: 'message-only',
                message: 'Items Edited!',
              },
              panelClass: 'myClass',
            });

            dialogRef.afterOpened().subscribe(() =>
              setTimeout(() => {
                dialogRef.close();
              }, 1500)
            );
            dialogRef.afterClosed().subscribe((result) => {
              this.Router.navigateByUrl('/seller');
            });
          }
        });
    } else {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '200px',
        height: '200px',
        data: {
          type: 'message-only',
          message: 'Price Minimum Rp. 1.000,-',
        },
        panelClass: 'myClass',
      });

      dialogRef.afterOpened().subscribe(() =>
        setTimeout(() => {
          dialogRef.close();
        }, 1500)
      );
    }
  }
}

export interface Details {
  items_id: string;
  items_name: string;
  price: string;
  sold_amount: string;
  category_name: string;
}
