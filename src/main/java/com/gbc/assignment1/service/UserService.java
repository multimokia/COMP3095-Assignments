package com.gbc.assignment1.service;

import java.util.List;

import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;

public interface UserService {
    AppUser saveUser(AppUser user);
    Recipe saveRecipe(Recipe recipe);
    void addRecipeToUser(Long userId, Long recipeId);
    AppUser getUser(String username);
}
