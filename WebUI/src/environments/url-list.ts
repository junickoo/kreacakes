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
  public static readonly editItem = 'http://localhost:8080/kreas/edit-items';
  public static readonly snapAPi = 'http://localhost:3000/';
  public static readonly getCategory =
    'http://localhost:8080/kreas/get-category';
  public static readonly getOrder = 'http://localhost:8080/kreas/get-order';
  public static readonly sendItem = 'http://localhost:8080/kreas/send-item';
  public static readonly getRecommendation =
    'http://localhost:8080/kreas/get-recommendation';
  public static readonly getSearch = 'http://localhost:8080/kreas/get-search';
}
