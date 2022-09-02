package com.krea.service.DAO;

import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;

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
}
