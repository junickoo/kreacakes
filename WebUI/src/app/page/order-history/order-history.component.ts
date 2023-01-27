import { MatTableDataSource } from '@angular/material/table';
import { ApiUrl } from 'src/environments/url-list';
import { HttpClient } from '@angular/common/http';
import { SellerServiceService } from './../../service/seller-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns: string[] = ['cart_id', 'timestamp', 'details'];
  dataSource: any;
  userId = sessionStorage.getItem('user_id');
  constructor(private http: HttpClient) {
    this.http
      .post(ApiUrl.getCart, { userId: this.userId })
      .subscribe((param: any) => {
        this.dataSource = new MatTableDataSource(param.message);
        console.log(this.dataSource);
      });
  }
  @ViewChild(MatSort) sort: MatSort;

  sortChanged() {
    this.dataSource.sort = this.sort;
  }
  detailOrder(cart_id: any) {
    var details: any = 'Order Details: ';
    var total: any = 0;
    this.http
      .post(ApiUrl.getCartDetails, { cartId: cart_id })
      .subscribe((params: any) => {
        if (params.error_schema.message === 'success') {
          params.message.forEach((element: any) => {
            var status: any;
            if (element.sent) {
              status = 'Sent';
            } else {
              status = 'On Progress';
            }
            details +=
              '\n\nName: ' +
              element.items_name +
              '\nQuantity: ' +
              element.quantity +
              '\nTimestamp: ' +
              element.timestamp.split('T')[0] +
              '\nPrice: ' +
              element.price +
              '\nStatus: ' +
              status;
            total += parseInt(element.price) * parseInt(element.quantity);
          });
          alert(details + '\n\n' + 'Total: ' + total);
        }
      });
  }
  ngOnInit(): void {}
}
