import { MatDialog } from '@angular/material/dialog';
import {
  DataDelete,
  DialogOverviewComponent,
} from './../../layout/dialog-overview/dialog-overview.component';
import { Router } from '@angular/router';
import { SellerServiceService } from './../../service/seller-service.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css'],
})
export class SellerPageComponent implements OnInit {
  dataSource: any;
  dataSourceOrder: any;
  clicked = new Array();
  constructor(
    private loginservice: LoginServiceService,
    private sellerService: SellerServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {
    // this.dataSource = JSON.parse(sessionStorage.getItem('sellerItem') || '{}');

    this.sellerService.getOrder(this.userId).subscribe((dataparam: any) => {
      this.dataSourceOrder = dataparam.message;
      console.log(this.dataSourceOrder);
    });
  }
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'items_name',
    'price',
    'sold_amount',
    'category_name',
    'button',
  ];
  displayedColumnsOrder: string[] = [
    'ITEMS_NAME',
    'QUANTITY',
    'CART_ID',
    'STATUS',
  ];
  userId = sessionStorage.getItem('user_id');
  ngOnInit(): void {
    this.displayedColumnsOrder.forEach((el) => {
      this.clicked.push(false);
    });
    this.sellerService
      .getItemsSeller(this.userId)
      .subscribe((dataparam: any) => {
        this.dataSource = new MatTableDataSource<dataSource>(dataparam.message);
        console.log('test');
        console.log(this.dataSource);
      });
    // this.loginservice.getItemsSeller();
    // let dataDisplay = JSON.parse(dataTemp);
  }
  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  add() {
    sessionStorage.removeItem('detailsItem');
    sessionStorage.setItem('pageName', 'addItem');
    this.router.navigateByUrl('/add-item');
  }
  deleteItem(item_id: any) {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '350px',
      data: {
        type: 'delete-items',
        item_id: item_id,
      },
    });

    // this.sellerService
    //   .deleteItem(item_id, this.userId)
    //   .subscribe((resp) => console.log(resp));
    // window.location.reload();
  }

  editItem(item_id: any, name: any, price: any, sold: any, category: any) {
    let detailsItem = JSON.stringify({
      items_id: item_id,
      items_name: name,
      price: price,
      sold_amount: sold,
      category_id: category,
    });

    sessionStorage.setItem('detailsItem', detailsItem);
    sessionStorage.setItem('pageName', 'addItem');
    this.router.navigateByUrl('/edit-item');
  }

  listOrder: boolean = false;
  listItem: boolean = true;
  orderList() {
    this.listOrder = true;
    this.listItem = false;
  }
  itemList() {
    this.listOrder = false;
    this.listItem = true;
  }
  sended = false;
  sendItem(cartItemId: any, response: any) {
    this.sellerService
      .sendItem(cartItemId)
      .subscribe((data) => console.log(data));
  }
  getFilterMonth(interval: any) {
    console.log(interval.target.value);
    if (interval.target.value === 'allTime') {
      console.log('vale');
      this.sellerService
        .getItemsSeller(this.userId)
        .subscribe((dataparam: any) => {
          this.dataSource = new MatTableDataSource<dataSource>(
            dataparam.message
          );
          console.log(dataparam);
        });
    } else {
      this.sellerService
        .getSellingPerformance(this.userId, interval.target.value)
        .subscribe((dataparam: any) => {
          this.dataSource = new MatTableDataSource<dataSource>(
            dataparam.message
          );
          console.log(this.dataSource);
        });
    }
  }
  announceSortChange(sortState: Sort) {
    console.log(sortState);
    console.log(this.dataSource);
    this.dataSource.sort = this.sort;
  }
}
interface dataSource {
  items_id: any;
  price: any;
  sold_amount: any;
  items_name: any;
  category_name: any;
}
