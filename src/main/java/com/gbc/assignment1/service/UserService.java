package com.gbc.assignment1.service;

import javax.security.auth.login.CredentialException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;

public interface UserService {
    void registerUser(String username, String password) throws AuthenticationException;
    String loginUser(String username, String password) throws UsernameNotFoundException, CredentialException;
    AppUser saveUser(AppUser user);
    Recipe saveRecipe(Recipe recipe);
    void addRecipeToUser(Long userId, Long recipeId);
    AppUser getUserByUsername(String username);
    AppUser getUser(Long id);
}
