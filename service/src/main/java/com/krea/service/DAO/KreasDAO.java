package com.krea.service.DAO;

import com.krea.service.payload.CartItems;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class KreasDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    private SimpleJdbcCall jdbcCall;

    public Map<String, Object> usernameCheck(String in_username){
        jdbcCall = new SimpleJdbcCall(jdbcTemplate).withFunctionName("check_username").withSchemaName("public");
        SqlParameterSource in = new MapSqlParameterSource().addValue("in_username", in_username);

        Map<String, Object> result = jdbcCall.execute(in);

        return result;
    }
    public Map<String, Object> testingAccount(String in_username){
        jdbcCall = new SimpleJdbcCall(jdbcTemplate).withFunctionName("get_account").withSchemaName("public");

        SqlParameterSource in = new MapSqlParameterSource().addValue("in_username", in_username);

        Map<String, Object> result = jdbcCall.execute(in);

        return result;
    }

    public Map<String, Object> loginCheck(String in_username, String in_password){
        jdbcCall = new SimpleJdbcCall(jdbcTemplate).withFunctionName("funct_login").withSchemaName("public");

        SqlParameterSource in = new MapSqlParameterSource().addValue("in_username", in_username).addValue("in_password", in_password);

       Map<String, Object> result = jdbcCall.execute(in);

       return result;
    }

    public String registerAcc(String in_username, String in_password, String in_email, String in_role, String in_phone){

        jdbcTemplate.update("call ins_register(?, ?, ?, ?, 0, ?)", in_username, in_password, in_email, in_role, in_phone);

        return "test";
    }

    public String insertItem(String in_user_id, Integer in_price, String in_category_id, String in_items_name){

        jdbcTemplate.update("call ins_items(?, ?, ?, ?)", in_user_id, in_price, in_category_id, in_items_name);

        return "test";
    }

    public String deleteItem(String in_items_id, String in_user_id){

        jdbcTemplate.update("call delete_items(?, ?)", in_items_id, in_user_id);

        return "done";
    }

    public String insertItemCart(String in_user_id, String in_items_id, Integer in_quantity){

        jdbcTemplate.update("CALL ins_cart_items(?, ?, ?)", in_user_id, in_items_id, in_quantity);

        return "Done";
    }

    public String clearCart(String in_user_id){
        jdbcTemplate.update("CALL del_clear_cart(?)", in_user_id);

        return "done";
    }
    public List<Map<String, Object>> getCartItems(String in_user_id){
        String sqlCartId ="select cart_id from cart where user_id = ? and paid = false;";
        List<Map<String, Object>> listCart = jdbcTemplate.queryForList(sqlCartId, in_user_id);
        System.out.println(listCart.get(0).get("cart_id"));
        String in_cart_id = listCart.get(0).get("cart_id").toString();

        String sql ="select * from cart_items inner join items on items.items_id = cart_items.items_id  where cart_id = ?";
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql, in_cart_id);
        System.out.println(list);

        return list;
    }
    public Map<String, Object> checkCart(String in_user_id){
        jdbcCall = new SimpleJdbcCall(jdbcTemplate).withFunctionName("check_cart").withSchemaName("public");

        SqlParameterSource in = new MapSqlParameterSource().addValue("in_user_id", in_user_id);
        Map<String, Object> result = jdbcCall.execute(in);

        return result;
    }

    public String payCart(String in_user_id){
        jdbcTemplate.update("CALL put_pay_cart(?)", in_user_id);

        return "done";
    }

    public String deleteCartItems(String cart_items_id){
        jdbcTemplate.update("DELETE from cart_items where cart_items_id = ? ", cart_items_id);

        return "done";
    }
}
