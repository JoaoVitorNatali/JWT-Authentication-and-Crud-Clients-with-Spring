package com.example.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RotasFront implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry){
        registry.addViewController("/").setViewName("forward:/html/index.html");
        registry.addViewController("/cadastro").setViewName("forward:/html/cadastro.html");
        registry.addViewController("/clientes").setViewName("forward:/html/clientes.html");
    }
}
