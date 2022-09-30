package com.krea.service.payload;

public class CartItemsDelete {
    String cartItemsId;
    String userId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCartItemsId() {
        return cartItemsId;
    }

    public void setCartItemsId(String cartItemsId) {
        this.cartItemsId = cartItemsId;
    }
}
