package com.gbc.assignment1.service;

import java.util.ArrayList;
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
public class UserServiceImplementation implements UserService {
    private final UserRepo _userRepo;
    private final RecipeRepo _recipeRepo;

    @Override
    public AppUser saveUser(AppUser user) {
        return _userRepo.save(user);
    }

    @Override
    public Recipe saveRecipe(Recipe recipe) {
        return _recipeRepo.save(recipe);
    }

    @Override
    public void addRecipeToUser(Long userId, Long recipeId) {
        AppUser user = _userRepo.findById(userId).get();
        Recipe recipe = _recipeRepo.findById(recipeId).get();
        user.getRecipes().add(recipe);
    }

    @Override
    public AppUser getUser(String username) {
        return _userRepo.findByUsername(username);
    }
}
