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

  getSellingPerformance(user_id: any, interval: any) {
    return this.http.post(ApiUrl.getPerformance, {
      userId: user_id,
      interval: interval,
    });
  }

  addItems(name: any, category: any, price: any, userId: any, metadata: any) {
    return this.http.post(ApiUrl.addItem, {
      userId: userId,
      price: price,
      category: category,
      itemsName: name,
      metadata: metadata,
    });
  }

  editItems(id: any, name: any, category: any, price: any) {
    return this.http.post(ApiUrl.editItem, {
      items_name: name,
      price: price,
      category: category,
      items_id: id,
    });
  }

  setItem(response: any) {
    var responseTemp = JSON.stringify(response.message);
    sessionStorage.setItem('sellerItem', responseTemp);
  }

  getCategory() {
    return this.http.get(ApiUrl.getCategory);
  }

  getOrder(user_id: any) {
    return this.http.post(ApiUrl.getOrder, {
      userId: user_id,
    });
  }

  sendItem(cartItemId: any) {
    return this.http.put(ApiUrl.sendItem, {
      cart_items_id: cartItemId,
    });
  }
}
