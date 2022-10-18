package com.krea.service.Controller;

import com.krea.service.DAO.KreasDAO;
import com.krea.service.payload.*;
import org.apache.commons.codec.binary.Base64;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Entity;


import com.twilio.Twilio;
import com.twilio.converter.Promoter;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Validated
@RequestMapping(value = "/kreas")
public class KreasController{
    @Autowired
    private KreasDAO kreasDAO;

    Map<String, Object> outputParameter = new HashMap<>();

    @PostMapping(path = "/login-check")
    public Map<String, Object> login(@RequestBody @Valid  LoginPayload loginPayload){

        Map<String, Object> checkUsername = kreasDAO.usernameCheck(loginPayload.getUsername());


        if(checkUsername.get("returnvalue").toString() == "true"){

            Map<String, Object> checkLogin = kreasDAO.loginCheck(loginPayload.getUsername(), loginPayload.getPassword());
            if(checkLogin.get("returnvalue").toString() == "true"){
                outputParameter.put("message", "Login Success");
                outputParameter.put("status", "200");

        Map<String, Object> test = kreasDAO.testingAccount(loginPayload.getUsername());
        JSONObject object = new JSONObject(test.get("returnvalue"));
        JSONObject account = new JSONObject(object.getString("value"));
        Map<String, Object> account_details = new HashMap<>();
        account_details.put("username", account.getString("username"));
                account_details.put("role", account.getString("role"));
                account_details.put("user_id", account.getString("user_id"));
                account_details.put("phone", account.getString("phone"));
                account_details.put("email", account.getString("email"));
                account_details.put("balance", account.getInt("balance"));
        outputParameter.put("data", account_details);
            }
            else {
                outputParameter.put("data", null);
                outputParameter.put("message", "Username and Password didn't match");
                outputParameter.put("status", "500");
            }

        }
        else {
            outputParameter.put("message", "Account not found");
            outputParameter.put("status", "500");
        }


        return outputParameter;
    }

    @PostMapping(path = "/register-account")
    public Map<String, Object> registerAcc(@RequestBody RegisterPayload registerPayload){

        Map<String, Object> checkUsername = kreasDAO.usernameCheck(registerPayload.getUsername());

        if(checkUsername.get("returnvalue").toString() == "true"){
            outputParameter.put("message", "Username has already taken");
            outputParameter.put("status", "400");
        }
        else{
            kreasDAO.registerAcc(registerPayload.getUsername(), registerPayload.getPassword(), registerPayload.getEmail(), registerPayload.getRole(), registerPayload.getPhone());
            outputParameter.put("message", "Register Success");
            outputParameter.put("status", "200");
        }

        return outputParameter;
    }

    @PostMapping(path = "/insert-items")
    public Map<String,Object> insItems(@RequestBody Items items){

        kreasDAO.insertItem(items.getUserId(), items.getPrice(), items.getCategory(), items.getItemsName(), items.getMetadata());

        outputParameter.put("message", "Items Added");
        outputParameter.put("status", "200");

        return outputParameter;
    }

    @PostMapping(path = "/delete-items")
    public Map<String, Object> deleteItems(@RequestBody DeleteItems deleteItems){

        kreasDAO.deleteItem(deleteItems.getItemsId(), deleteItems.getUserId());

        outputParameter.put("message", "Items Deleted");
        outputParameter.put("status", "200");

        return outputParameter;
    }

    @PutMapping(path = "/send-item")
    public Map<String, Object> sendItem(@RequestBody CartItemsSend cartItemsSend){
        String output = kreasDAO.sendItem(cartItemsSend.getCart_items_id());


        outputParameter.put("message", output);
        outputParameter.put("status", "200");

        return outputParameter;
    }
    @PostMapping(path = "/edit-items")
    public Map<String, Object> editItems(@RequestBody editItem editItem){

        kreasDAO.editItem(editItem.getItems_id(),editItem.getItems_name(),editItem.getPrice(),editItem.getCategory());

        outputParameter.put("message", "Items Edited");
        outputParameter.put("status", "200");

        return outputParameter;
    }

    @PostMapping(path = "/insert-cart-item")
    public Map<String, Object> insertCartItems(@RequestBody InsertCartItems insertCartItems){

        kreasDAO.insertItemCart(insertCartItems.getUserId(), insertCartItems.getItemsId(), insertCartItems.getQuantity());
        outputParameter.put("message", "Insert Success");
        outputParameter.put("status", "200");

        return outputParameter;
    }

    @PostMapping(path = "/clear-cart")
    public Map<String, Object> clearCart(@RequestBody ClearCart clearCart){

        Map<String, Object> checkCart = kreasDAO.checkCart(clearCart.getUserId());
        if(checkCart.get("returnvalue").toString() == "true"){
            kreasDAO.clearCart(clearCart.getUserId());
            outputParameter.put("message", "Cart Cleared");
            outputParameter.put("status", "200");
        }
        else {
            outputParameter.put("message", "Cart Empty");
            outputParameter.put("status", "400");
        }

        return outputParameter;
    }

    @PutMapping(path = "/pay-cart")
    public Map<String, Object> payCart(@RequestBody PayCart payCart){
        Map<String, Object> checkCart = kreasDAO.checkCart(payCart.getUserId());

        if(checkCart.get("returnvalue").toString() == "true"){
            kreasDAO.payCart(payCart.getUserId());
            outputParameter.put("message", "Cart Paid");
            outputParameter.put("status", "200");
        }
        else{
            outputParameter.put("message", "Cart Empty");
            outputParameter.put("status", "400");
        }

        return outputParameter;
    }

    @PostMapping(path = "/get-cart-items")
    public Map<String, Object> getCartItems(@RequestBody CartItems cartItems){
        List<Map<String, Object>> output = kreasDAO.getCartItems(cartItems.getUserId());

        if(output != null){
//            kreasDAO.payCart(payCart.getUserId());
            outputParameter.put("message", output);
            outputParameter.put("status", "200");
        }
        else{
            outputParameter.put("message", "Null");
            outputParameter.put("status", "400");
        }

        return outputParameter;
    }

    @PutMapping(path = "/delete-cart-items")
    public Map<String, Object> deleteCartItems(@RequestBody CartItemsDelete cartItemsDelete){
        String output = kreasDAO.deleteCartItems(cartItemsDelete.getCartItemsId());
        List<Map<String, Object>> outputMessage = kreasDAO.getCartItems(cartItemsDelete.getUserId());

        if(outputMessage != null){
//            kreasDAO.payCart(payCart.getUserId());
            outputParameter.put("message", outputMessage);
            outputParameter.put("status", "200");
        }
        else{
            outputParameter.put("message", "Null");
            outputParameter.put("status", "400");
        }

        return outputParameter;
    }



    @PostMapping(path = "/get-item-seller")
    public Map<String, Object> getItemSeller(@RequestBody PayCart payCart){
        List<Map<String, Object>> output = kreasDAO.getItemSeller(payCart.getUserId());
        outputParameter.put("message", output);
        outputParameter.put("status", "400");
        return outputParameter;
    }

    @GetMapping(path ="/get-category")
    public Map<String, Object> getCategory(){
        List<Map<String, Object>> output = kreasDAO.getCategory();
        outputParameter.put("message", output);
        outputParameter.put("status", "200");
        return outputParameter;
    }

    @PostMapping(path ="/get-order")
    public Map<String, Object> getOrder(@RequestBody ClearCart clearCart){
        List<Map<String, Object>> output = kreasDAO.getOrderList(clearCart.getUserId());
        outputParameter.put("message", output);
        outputParameter.put("status", "200");
        return outputParameter;
    }

    @GetMapping(path = "/get-recommendation")
    public Map<String, Object> getRecommendation(){
        List<Map<String, Object>> output = kreasDAO.getRecommendation();
        outputParameter.put("message", output);
        outputParameter.put("status", "200");

        return outputParameter;
    }
}
