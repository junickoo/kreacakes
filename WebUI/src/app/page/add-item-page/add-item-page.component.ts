import { Router } from '@angular/router';
import { SellerServiceService } from './../../service/seller-service.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.css'],
})
export class AddItemPageComponent implements OnInit {
  pageConfig: any;
  categoryList: any;
  constructor(
    private http: HttpClient,
    private seller: SellerServiceService,
    private Router: Router
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

  addItem(name: any, category: any, price: any) {
    console.log(category.value);
    this.seller
      .addItems(name.value, category.value, price.value, this.userId)
      .subscribe((data: any) => {
        if (data.status == '200') {
          this.Router.navigateByUrl('/seller');
        }
      });
  }
  editItem(name: any, category: any, price: any) {
    let items_id = this.object.items_id;
    this.seller
      .editItems(items_id, name.value, category.value, price.value)
      .subscribe((data: any) => {
        if (data.status == '200') {
          this.Router.navigateByUrl('/seller');
        }
      });
    alert('test');
  }
}

export interface Details {
  items_id: string;
  items_name: string;
  price: string;
  sold_amount: string;
  category_name: string;
}
