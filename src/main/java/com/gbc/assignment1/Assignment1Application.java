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
