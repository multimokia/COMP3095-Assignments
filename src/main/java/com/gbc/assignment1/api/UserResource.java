/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Endpoint for users
*/
package com.gbc.assignment1.api;

import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Set;

import javax.naming.NameNotFoundException;
import javax.security.auth.login.CredentialException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gbc.assignment1.service.MealPlanService;
import com.gbc.assignment1.service.RecipeService;
import com.gbc.assignment1.service.UserService;
import com.gbc.assignment1.exceptions.UserAlreadyExistsException;
import com.gbc.assignment1.formtypes.EditUserForm;
import com.gbc.assignment1.formtypes.LoginUserForm;
import com.gbc.assignment1.formtypes.MealPlanForm;
import com.gbc.assignment1.formtypes.UserProfileForm;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.MealPlan;
import com.gbc.assignment1.models.Recipe;
import com.gbc.assignment1.security.TokenManager;

import lombok.RequiredArgsConstructor;

// NOTE: The user facing api, when an auth token is required, will serve as an @me fetch
// In other words, these endpoints don't return ALL favourites/recipes/etc., only the ones attributed to
// The user their token represents
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserResource {
    private final UserService _userService;
    private final MealPlanService _mealplanService;
    private final RecipeService _recipeService;

    private Boolean isValidJWT(String token) {
        if (token == null) {
            return false;
        }

        String username = TokenManager.getUsernameFromToken(token);
        AppUser user = _userService.getUserByUsername(username);

        if (user == null) {
            return false;
        }

        return TokenManager.validateJwtToken(token, user);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody LoginUserForm form) {
        try {
            _userService.registerUser(form.getUsername(), form.getPassword());
        }

        catch (UserAlreadyExistsException ex) {
            return new ResponseEntity<>("Conflict.", HttpStatus.CONFLICT);
        }

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/signup").toUriString());
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserForm form) {
        try {
            String jwt = _userService.loginUser(form.getUsername(), form.getPassword());

            return ResponseEntity.ok(new HashMap<String, Object>(){{
                put("jwt", jwt);
            }});
        }

        catch (UsernameNotFoundException | CredentialException ex) {
            return new ResponseEntity<>("Unauthorized.", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileForm> getProfileInfo(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));
        return ResponseEntity.ok().body(new UserProfileForm(
            user.getUsername(),
            user.getAvatar(),
            user.getRecipes(),
            user.getFavorites()
        ));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> setProfileInfo(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @RequestBody EditUserForm form
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));

        if (form.getPassword() != null) {
            user.setPassword(BCrypt.hashpw(form.getPassword(), BCrypt.gensalt()));
        }

        if (form.getAvatar() != null) {
            user.setAvatar(form.getAvatar());
        }

        return ResponseEntity.ok(_userService.saveUser(user));
    }

    @GetMapping("/mealplans")
    public ResponseEntity<?> getMealPlans(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));
        return ResponseEntity.ok(_mealplanService.getAllMealPlansForUserDisp(user));
    }

    @GetMapping("/favorites")
    public ResponseEntity<?> getFavorites(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));

        return ResponseEntity.ok(user.getFavorites());
    }

    @GetMapping("/favorites/{id}")
    public ResponseEntity<?> getFavorite(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @PathVariable Long id
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));

        Recipe result = user.getFavorites().stream().filter(f -> f.getId() == id).findFirst().orElse(null);

        if (result == null) {
            return ResponseEntity.ok("null");
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/favorites/{id}")
    public ResponseEntity<?> addFavorite(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @PathVariable Long id
    )  {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));

        try {
            Recipe recipe = _recipeService.getRecipe(id);

            if (user.getFavorites().contains(recipe)) {
                return new ResponseEntity<>("", HttpStatus.CONFLICT);
            }
            Set<Recipe> favorites = user.getFavorites();

            favorites.add(recipe);
            user.setFavorites(favorites);

            _userService.saveUser(user);

            return ResponseEntity.ok(recipe);
        }

        catch (NameNotFoundException ex) {
            return new ResponseEntity<>("Not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/favorites/{id}")
    public ResponseEntity<?> deleteFavorite(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @PathVariable Long id
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));

        try {
            Recipe recipe = _recipeService.getRecipe(id);

            if (!user.getFavorites().contains(recipe)) {
                return new ResponseEntity<>("Recipe is not in user's favorites", HttpStatus.NOT_FOUND);
            }

            user.getFavorites().remove(recipe);
            return ResponseEntity.ok(_userService.saveUser(user));
        }
        catch (NameNotFoundException ex) {
            return new ResponseEntity<>("Recipe does not exist.", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/mealplans/create")
    public ResponseEntity<?> createMealPlan(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @RequestBody MealPlanForm form
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Date st = new Date(form.getTimestamp());
        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));

        try {
            Recipe recipe = _recipeService.getRecipe(form.getRecipeId());
            return ResponseEntity.ok(_mealplanService.createMealPlan(user, recipe, st, form.getEventName()));
        }

        catch (NameNotFoundException ex) {
            return new ResponseEntity<>("Recipe not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/mealplans/{id}")
    public ResponseEntity<?> modifyMealPlan(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @PathVariable Long id,
        @RequestBody MealPlanForm form
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Date st = new Date(form.getTimestamp());

        try {
            Recipe recipe = _recipeService.getRecipe(form.getRecipeId());
            MealPlan mealplan = _mealplanService.getMealPlan(id);

            mealplan.setDate(st);
            mealplan.setRecipeId(recipe.getId());
            mealplan.setEventName(form.getEventName());
            return ResponseEntity.ok(_mealplanService.saveMealPlan(mealplan));
        }

        catch (NameNotFoundException ex) {
            return new ResponseEntity<>("Not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/mealplans/{id}")
    public ResponseEntity<?> deleteMealPlan(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @PathVariable Long id
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));
        MealPlan rv = _mealplanService.deleteMealPlan(user, id);

        if (rv != null) {
            return ResponseEntity.ok(rv);
        }
        return new ResponseEntity<>("Mealplan not found.", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/events")
    public ResponseEntity<?> getEvents(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));

        return ResponseEntity.ok(_mealplanService.getAllEventsForUserdisp(user));
    }
}
