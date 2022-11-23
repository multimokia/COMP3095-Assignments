/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Recipe Service interface
*/
package com.gbc.assignment1.service;

import java.util.List;

import javax.naming.NameNotFoundException;

import com.gbc.assignment1.formtypes.IRecipeDispForm;
import com.gbc.assignment1.formtypes.RecipeDispForm;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;

public interface RecipeService {
    Recipe createRecipe(String name, String steps, AppUser author, String ingredients);
    Recipe getRecipe(Long recipeId) throws NameNotFoundException;
    RecipeDispForm getRecipeDisp(Long recipeId) throws NameNotFoundException;
    List<RecipeDispForm> getRecipesByName(String name, int page, int pageSize);
    List<RecipeDispForm> getAllRecipes(int page, int pageSize);
    List<IRecipeDispForm> getAllRecipesContainingNameAndUsername(
        String partialRecipeName,
        String partialUserName,
        int page,
        int pageSize
    );
}
