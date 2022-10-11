package com.gbc.assignment1;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;
import com.gbc.assignment1.service.UserService;

@SpringBootApplication
public class Assignment1Application {

	public static void main(String[] args) {
		SpringApplication.run(Assignment1Application.class, args);
	}

    @Bean
    CommandLineRunner run(UserService userService) {
        return args -> {
            // Add recipes
            userService.saveRecipe(new Recipe(
                null,
                "Steak",
                (long)101331770,
                "1. Talk about steak\n2. Upset Maziar\n3. Use Maziar's anger as heat to grill steak until medium rare."
            ));
            userService.saveRecipe(new Recipe(
                null,
                "Random Entry 1",
                (long)101331770,
                "I"
            ));
            userService.saveRecipe(new Recipe(
                null,
                "Random Entry 2",
                (long)101331770,
                "don't"
            ));
            userService.saveRecipe(new Recipe(
                null,
                "Random Entry 3",
                (long)101331770,
                "care"
            ));

            // Now add users
            userService.saveUser(new AppUser(null, "multimokia", "1234", new ArrayList<>()));
            userService.saveUser(new AppUser(null, "Stanley", "1234", new ArrayList<>()));
            userService.saveUser(new AppUser(null, "Mehrad", "1234", new ArrayList<>()));
            userService.saveUser(new AppUser(null, "Minkyu", "1234", new ArrayList<>()));


            userService.addRecipeToUser("multimokia", "Steak");
            userService.addRecipeToUser("Mehrad", "Random Entry 3");
            userService.addRecipeToUser("Stanley", "Random Entry 1");
            userService.addRecipeToUser("Minkyu", "Random Entry 2");
            userService.addRecipeToUser("Minkyu", "Steak");
        };
    }
}
