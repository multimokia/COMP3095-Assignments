/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Entrypoint
*/
package com.gbc.assignment1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

import com.gbc.assignment1.security.TokenManager;

import io.github.cdimascio.dotenv.Dotenv;


@SpringBootApplication
public class Assignment1Application {
    public static Dotenv ENV_CONF;

	public static void main(String[] args) {
		SpringApplication.run(Assignment1Application.class, args);

        ENV_CONF = Dotenv.configure()
            .directory("./src/main/ui/.env")
            .load();

        // Init the tokenmanager by assigning its secret key
        TokenManager.init();
    }

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}
