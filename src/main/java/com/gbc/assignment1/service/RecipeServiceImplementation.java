/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Implementation of Recipe Service
*/
package com.gbc.assignment1.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import javax.naming.NameNotFoundException;
import javax.transaction.Transactional;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gbc.assignment1.formtypes.IRecipeDispForm;
import com.gbc.assignment1.formtypes.RecipeDispForm;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;
import com.gbc.assignment1.repo.RecipeRepo;
import com.gbc.assignment1.repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RecipeServiceImplementation implements RecipeService {
    private final RecipeRepo _recipeRepo;
    private final UserRepo _userRepo;

    private RecipeDispForm toRecipeDispForm(Recipe recipe) {
        AppUser user = _userRepo.findById(recipe.getAuthorId()).get();

        RecipeDispForm rv = new RecipeDispForm(
            recipe.getId(),
            recipe.getName(),
            recipe.getSteps(),
            user != null ? user.getUsername() : "Ghost",
            recipe.getIngredients()
        );

        return rv;
    }

    private List<RecipeDispForm> toRecipeDispFormBulk(List<Recipe> recipes) {
        List<RecipeDispForm> rv = new ArrayList<>();

        for (Recipe recipe : recipes) {
            rv.add(toRecipeDispForm(recipe));
        }

        return rv;
    }

    @Override
    public Recipe createRecipe(String name, String steps, AppUser author, String ingredients) {
        Recipe recipe = new Recipe(null, name, ingredients, author.getId(), steps, new HashSet<>());
        author.getRecipes().add(recipe);

        _recipeRepo.save(recipe);
        _userRepo.save(author);
        return recipe;
    }

    public Recipe getRecipe(Long recipeId) throws NameNotFoundException {
        Recipe recipe = _recipeRepo.findById(recipeId).get();

        if (recipe == null) {
            throw new NameNotFoundException("Recipe not found.");
        }

        return recipe;
    }

    @Override
    public RecipeDispForm getRecipeDisp(Long recipeId) throws NameNotFoundException {
        Recipe recipe = _recipeRepo.findById(recipeId).get();

        if (recipe == null) {
            throw new NameNotFoundException("Recipe not found.");
        }

        return toRecipeDispForm(recipe);
    }

    @Override
    public List<RecipeDispForm> getRecipesByName(String name, int page, int pageSize) {
        return toRecipeDispFormBulk(_recipeRepo.findByNameContains(name, PageRequest.of(page, pageSize)).getContent());
    }

    @Override
    public List<RecipeDispForm> getAllRecipes(int page, int pageSize) {
        return toRecipeDispFormBulk(_recipeRepo.findAll(PageRequest.of(page, pageSize)).getContent());
    }

    public List<IRecipeDispForm> getAllRecipesContainingNameAndUsername(
        String partialRecipeName,
        String partialUserName,
        int page,
        int pageSize
    ) {
        return _recipeRepo.findAllByNameContainsAndUsernameContains(
            partialRecipeName.toUpperCase(),
            partialUserName.toUpperCase(),
            PageRequest.of(page, pageSize)
        ).getContent();
    }

    @Override
    public void deleteRecipe(Long id) throws NameNotFoundException {
        Recipe recipe = _recipeRepo.findById(id).get();

        if (recipe == null) {
            throw new NameNotFoundException("Recipe not found.");
        }

        _recipeRepo.delete(recipe);
    }
}
