package com.krea.service.Controller;

import com.krea.service.DAO.KreasDAO;
import com.krea.service.payload.*;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Entity;


import com.twilio.Twilio;
import com.twilio.converter.Promoter;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/kreas")
public class KreasController{
    @Autowired
    private KreasDAO kreasDAO;

    Map<String, Object> outputParameter = new HashMap<>();

    @GetMapping(path = "/login-check")
    public Map<String, Object> login(@RequestBody LoginPayload loginPayload){


        Map<String, Object> checkUsername = kreasDAO.usernameCheck(loginPayload.getUsername());


        if(checkUsername.get("returnvalue").toString() == "true"){

            Map<String, Object> checkLogin = kreasDAO.loginCheck(loginPayload.getUsername(), loginPayload.getPassword());
            if(checkLogin.get("returnvalue").toString() == "true"){
                outputParameter.put("message", "Login Success");
                outputParameter.put("status", "200");
            }
            else {
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

        kreasDAO.insertItem(items.getUserId(), items.getPrice(), items.getCategory(), items.getItemsName());

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

    @PostMapping(path = "/pay-cart")
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
}
