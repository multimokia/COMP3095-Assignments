/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Implementation of user service
*/
package com.gbc.assignment1.service;

import java.util.ArrayList;

import javax.security.auth.login.CredentialException;
import javax.transaction.Transactional;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.gbc.assignment1.exceptions.UserAlreadyExistsException;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;
import com.gbc.assignment1.repo.RecipeRepo;
import com.gbc.assignment1.repo.UserRepo;
import com.gbc.assignment1.security.TokenManager;

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
    public AppUser getUserByUsername(String username) {
        return _userRepo.findByUsername(username);
    }

    @Override
    public void registerUser(String username, String password) throws AuthenticationException {
        AppUser user = getUserByUsername(username);

        //Stop if conflicting user
        if (user != null) {
            throw new UserAlreadyExistsException("User already exists.");
        }

        //Continue
        user = new AppUser(
            null,
            username,
            BCrypt.hashpw(password, BCrypt.gensalt()),
            new ArrayList<>(),
            new ArrayList<>(),
            new ArrayList<>()
        );

        saveUser(user);
    }

    @Override
    public String loginUser(String username, String password) throws UsernameNotFoundException, CredentialException {
        AppUser user = getUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found.");
        }

        if (BCrypt.checkpw(password, user.getPassword())) {
            return TokenManager.generateJwtToken(user);
        }

        throw new CredentialException("Invalid Credentials");
    }

    @Override
    public AppUser getUser(Long id) {
        return _userRepo.findById(id).get();
    }
}
