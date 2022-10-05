import { environment } from 'src/environments/environment';

export class ApiUrl {
  public static readonly addCartItems =
    'http://localhost:8080/kreas/insert-cart-item';
  public static readonly getCartItems =
    'http://localhost:8080/kreas/get-cart-items';
  public static readonly deleteCartItems =
    'http://localhost:8080/kreas/delete-cart-items';
  public static readonly payCart = 'http://localhost:8080/kreas/pay-cart';
  public static readonly getItemSeller =
    'http://localhost:8080/kreas/get-item-seller';
  public static readonly delItemSeller =
    'http://localhost:8080/kreas/delete-items';
  public static readonly addItem = 'http://localhost:8080/kreas/insert-items';
  public static readonly snapAPi = 'http://localhost:3000/';
}
