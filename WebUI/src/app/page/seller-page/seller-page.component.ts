import { Router } from '@angular/router';
import { SellerServiceService } from './../../service/seller-service.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css'],
})
export class SellerPageComponent implements OnInit {
  dataSource: any;
  constructor(
    private loginservice: LoginServiceService,
    private sellerService: SellerServiceService,
    private router: Router
  ) {
    // this.dataSource = JSON.parse(sessionStorage.getItem('sellerItem') || '{}');
    this.sellerService
      .getItemsSeller(this.userId)
      .subscribe((dataparam: any) => {
        this.dataSource = dataparam.message;
      });
  }
  displayedColumns: string[] = [
    'NAME',
    'PRICE',
    'SOLD_AMOUNT',
    'CATEGORY',
    'BUTTON',
  ];
  userId = sessionStorage.getItem('user_id');
  ngOnInit(): void {
    // this.loginservice.getItemsSeller();
    // let dataDisplay = JSON.parse(dataTemp);
  }
  logout() {
    sessionStorage.setItem('isLogin', 'false');
    window.location.reload();
  }

  add() {
    this.router.navigateByUrl('/add-item');
  }
  deleteItem(item_id: any) {
    this.sellerService
      .deleteItem(item_id, this.userId)
      .subscribe((resp) => console.log(resp));
    window.location.reload();
  }
}
