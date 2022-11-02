import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/environments/url-list';

@Injectable({
  providedIn: 'root',
})
export class ItemCheckoutService {
  constructor(private http: HttpClient) {}

  addCart(in_userId: any, in_itemsid: any, in_quantity: any) {
    return this.http.post(ApiUrl.addCartItems, {
      userId: in_userId,
      itemsId: in_itemsid,
      quantity: in_quantity,
    });
  }

  cartItems(in_userId: any) {
    let body = {
      userId: in_userId,
    };
    return this.http.post(ApiUrl.getCartItems, body);
  }

  deleteCartItems(itemsId: any, userId: any) {
    return this.http.put(ApiUrl.deleteCartItems, {
      cartItemsId: itemsId,
      userId: userId,
    });
  }

  payCart(user_id: any) {
    return this.http.put(ApiUrl.payCart, {
      userId: user_id,
    });
  }

  snapApi(amount: any, id: any) {
    return this.http.post(ApiUrl.snapAPi, {
      gross_amount: amount,
      order_id: id,
    });
  }
}
// {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
//   Authorization:
//     'Basic ' +
//     Buffer.from('SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA').toString(
//       'base64'
//     ),
//   // Above is API server key for the Midtrans account, encoded to base64
// }
