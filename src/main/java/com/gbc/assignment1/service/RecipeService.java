package com.gbc.assignment1.service;

import java.util.List;

import javax.naming.NameNotFoundException;

import com.gbc.assignment1.formtypes.RecipeDispForm;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;

public interface RecipeService {
    Recipe createRecipe(String name, String steps, AppUser author);
    Recipe getRecipe(Long recipeId) throws NameNotFoundException;
    RecipeDispForm getRecipeDisp(Long recipeId) throws NameNotFoundException;
    List<RecipeDispForm> getRecipesByName(String name);
    List<RecipeDispForm> getAllRecipes();
}
