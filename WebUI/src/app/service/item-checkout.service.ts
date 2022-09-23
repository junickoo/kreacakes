import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/environments/url-list';

@Injectable({
  providedIn: 'root',
})
export class ItemCheckoutService {
  constructor(private http: HttpClient) {}

  addCart(in_userId: any, in_itemsid: any, in_quantity: any) {
    return this.http.post(ApiUrl.addCartItems, {
      userId: 'acc_3',
      itemsId: in_itemsid,
      quantity: in_quantity,
    });
  }
}
