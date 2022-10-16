package com.gbc.assignment1.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

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

    @Override
    public Recipe createRecipe(String name, String steps, AppUser author) {
        Recipe recipe = new Recipe(null, name, author.getId(), steps);
        author.getRecipes().add(recipe);

        _recipeRepo.save(recipe);
        _userRepo.save(author);
        return recipe;
    }

    @Override
    public Recipe getRecipe(Long recipeId) {
        return _recipeRepo.findById(recipeId).get();
    }

    @Override
    public List<Recipe> getRecipesByName(String name) {
        return _recipeRepo.findByNameContains(name);
    }

    @Override
    public List<Recipe> getAllRecipes() {
        return _recipeRepo.findAll();
    }
}
