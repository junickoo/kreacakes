package com.krea.service;

import org.apache.catalina.mapper.Constants;
import org.apache.tomcat.util.bcel.classfile.Constant;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.apache.http.HttpHeaders.*;

@Configuration
public class Config implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/kreas/**").allowedOrigins("*").allowedHeaders(AUTHORIZATION, ACCEPT, CONTENT_TYPE, USER_AGENT).maxAge(30).allowedMethods("GET","POST","PUT");
    }
}
