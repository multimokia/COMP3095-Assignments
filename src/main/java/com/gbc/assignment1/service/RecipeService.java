package com.gbc.assignment1.service;

import java.util.List;

import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;

public interface RecipeService {
    Recipe createRecipe(String name, String steps, AppUser author);
    Recipe getRecipe(Long recipeId);
    List<Recipe> getRecipesByName(String name);
    List<Recipe> getAllRecipes();
}
