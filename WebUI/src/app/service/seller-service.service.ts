import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/environments/url-list';

@Injectable({
  providedIn: 'root',
})
export class SellerServiceService {
  constructor(private http: HttpClient) {}

  deleteItem(item_id: any, user_id: any) {
    return this.http.post(ApiUrl.delItemSeller, {
      itemsId: item_id,
      userId: user_id,
    });
  }

  getItemsSeller(user_id: any) {
    return this.http.post(ApiUrl.getItemSeller, {
      userId: user_id,
    });
  }

  addItems(name: any, category: any, price: any, userId: any) {
    return this.http.post(ApiUrl.addItem, {
      userId: userId,
      price: price,
      category: category,
      itemsName: name,
    });
  }

  setItem(response: any) {
    var responseTemp = JSON.stringify(response.message);
    sessionStorage.setItem('sellerItem', responseTemp);
  }
}
