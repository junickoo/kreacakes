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
  constructor(
    private http: HttpClient,
    private seller: SellerServiceService,
    private Router: Router
  ) {}

  ngOnInit(): void {}

  userId = sessionStorage.getItem('user_id');
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
}
