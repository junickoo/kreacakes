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

        Map<String, Object> output = kreasDAO.insertItem(items.getUserId(), items.getPrice(), items.getCategory(), items.getItemsName(), items.getMetadata());

        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }

    @PostMapping(path = "/delete-items")
    public Map<String, Object> deleteItems(@RequestBody DeleteItems deleteItems){

        Map<String, Object> output = kreasDAO.deleteItem(deleteItems.getItemsId(), deleteItems.getUserId());

        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }

    @PutMapping(path = "/send-item")
    public Map<String, Object> sendItem(@RequestBody CartItemsSend cartItemsSend){
        Map<String, Object> output = kreasDAO.sendItem(cartItemsSend.getCart_items_id());

        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }
    @PutMapping(path = "/receive-item")
    public Map<String, Object> receiveItem(@RequestBody CartItemsSend cartItemsSend){
        Map<String, Object> output = kreasDAO.receiveItem(cartItemsSend.getCart_items_id());
        System.out.println(output);
        outputParameter = new HashMap<String, Object>();

        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }
    @PostMapping(path = "/edit-items")
    public Map<String, Object> editItems(@RequestBody editItem editItem){

        Map<String, Object> output = kreasDAO.editItem(editItem.getItems_id(),editItem.getItems_name(),editItem.getPrice(),editItem.getCategory());


        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }

    @PostMapping(path = "/insert-cart-item")
    public Map<String, Object> insertCartItems(@RequestBody InsertCartItems insertCartItems){

        Map<String, Object> output = kreasDAO.insertItemCart(insertCartItems.getUserId(), insertCartItems.getItemsId(), insertCartItems.getQuantity());

        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }

    @PostMapping(path = "/clear-cart")
    public Map<String, Object> clearCart(@RequestBody ClearCart clearCart){

        Map<String, Object> checkCart = kreasDAO.checkCart(clearCart.getUserId());
        Map<String, Object> errorMessage = new HashMap<>();
        if(checkCart.get("returnvalue").toString() == "true"){
            kreasDAO.clearCart(clearCart.getUserId());
            errorMessage.put("message", "Cart Cleared");
            errorMessage.put("status", "200");
            outputParameter.put("error_schema", errorMessage);
        }
        else {
            errorMessage.put("message", "Cart Empty");
            errorMessage.put("status", "400");
            outputParameter.put("error_schema", errorMessage);
        }

        return outputParameter;
    }

    @PutMapping(path = "/pay-cart")
    public Map<String, Object> payCart(@RequestBody PayCart payCart){
        Map<String, Object> checkCart = kreasDAO.checkCart(payCart.getUserId());
        Map<String, Object> errorMessage = new HashMap<>();

        if(checkCart.get("returnvalue").toString() == "true"){
            kreasDAO.payCart(payCart.getUserId());
            errorMessage.put("message", "Cart Paid");
            errorMessage.put("status", "200");
            outputParameter.put("error_schema", errorMessage);
        }
        else{
            errorMessage.put("message", "Cart Empty");
            errorMessage.put("status", "400");
            outputParameter.put("error_schema", errorMessage);
        }

        return outputParameter;
    }

    @PostMapping(path = "/get-cart-items")
    public Map<String, Object> getCartItems(@RequestBody CartItems cartItems){
        List<Map<String, Object>> output = kreasDAO.getCartItems(cartItems.getUserId());
        Map<String, Object> errorMessage = new HashMap<>();

        if(output != null){
//            kreasDAO.payCart(payCart.getUserId());
            outputParameter.put("message", output);
            errorMessage.put("status","200");
            errorMessage.put("message", "success");
            outputParameter.put("error_schema", errorMessage);
        }
        else{
            outputParameter.put("message", "Null");
            errorMessage.put("status","400");
            errorMessage.put("message", "success");
            outputParameter.put("error_schema", errorMessage);
        }

        return outputParameter;
    }

    @PutMapping(path = "/delete-cart-items")
    public Map<String, Object> deleteCartItems(@RequestBody CartItemsDelete cartItemsDelete){
        String output = kreasDAO.deleteCartItems(cartItemsDelete.getCartItemsId());
        List<Map<String, Object>> outputMessage = kreasDAO.getCartItems(cartItemsDelete.getUserId());
        Map<String, Object> errorMessage = new HashMap<>();

        if(outputMessage != null){
//            kreasDAO.payCart(payCart.getUserId());
            outputParameter.put("message", outputMessage);
            errorMessage.put("status","200");
            errorMessage.put("message", "success");
            outputParameter.put("error_schema", errorMessage);
        }
        else{
            outputParameter.put("message", "Null");
            errorMessage.put("status","400");
            errorMessage.put("message", "success");
            outputParameter.put("error_schema", errorMessage);
        }

        return outputParameter;
    }



    @PostMapping(path = "/get-item-seller")
    public Map<String, Object> getItemSeller(@RequestBody PayCart payCart){
        Map<String, Object> output = kreasDAO.getItemSeller(payCart.getUserId());
        outputParameter.put("message", output.get("message"));
        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }

    @GetMapping(path ="/get-category")
    public Map<String, Object> getCategory(){
        Map<String, Object> output = kreasDAO.getCategory();
        outputParameter.put("message", output.get("message"));
        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }

    @PostMapping(path ="/get-order")
    public Map<String, Object> getOrder(@RequestBody ClearCart clearCart){
        Map<String, Object> output = kreasDAO.getOrderList(clearCart.getUserId());
        outputParameter.put("message", output.get("message"));
        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    } @PostMapping(path ="/get-cart")
    public Map<String, Object> getCart(@RequestBody ClearCart clearCart){
        Map<String, Object> output = kreasDAO.getCart(clearCart.getUserId());
        outputParameter.put("message", output.get("message"));
        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }
    @PostMapping(path="/get-cart-details")
    public Map<String, Object> getCartDetails(@RequestBody CartDetails cartDetails){
        Map<String, Object> output = kreasDAO.getCartDetails(cartDetails.getCartId());
        outputParameter.put("message", output.get("message"));
        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }
    @PostMapping(path ="/get-performance")
    public Map<String, Object> getPerformance(@RequestBody SellingPerformance sellingPerformance){
        Map<String, Object> output = kreasDAO.getPerformance(sellingPerformance.getUserId(), sellingPerformance.getInterval());
        outputParameter.put("message", output.get("message"));
        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }
    @GetMapping(path = "/get-recommendation")
    public Map<String, Object> getRecommendation(){
        Map<String, Object> output = kreasDAO.getRecommendation();
        outputParameter.put("message", output.get("value"));
        outputParameter.put("status", output.get("error_message"));

        return outputParameter;
    }

    @PostMapping(path = "/get-search")
    public Map<String, Object> getSearch(@RequestBody Search search){
        Map<String, Object> output = kreasDAO.getSearch(search.getQuery());
        outputParameter.put("message", output.get("message"));
        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }

    @PostMapping(path = "/get-metadata")
    public Map<String, Object> getMetadata(@RequestBody Search search){
        Map<String, Object> output = kreasDAO.getMetadata(search.getQuery());
        outputParameter.put("message", output.get("message"));
        outputParameter.put("error_schema", output.get("error_message"));
        return outputParameter;
    }

}
