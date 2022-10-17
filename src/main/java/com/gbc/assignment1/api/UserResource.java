package com.gbc.assignment1.api;

import java.net.URI;
import java.util.Date;
import java.util.HashMap;

import javax.security.auth.login.CredentialException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gbc.assignment1.service.MealPlanService;
import com.gbc.assignment1.service.RecipeService;
import com.gbc.assignment1.service.UserService;
import com.gbc.assignment1.exceptions.UserAlreadyExistsException;
import com.gbc.assignment1.formtypes.LoginUserForm;
import com.gbc.assignment1.formtypes.MealPlanForm;
import com.gbc.assignment1.formtypes.UserProfileForm;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.MealPlan;
import com.gbc.assignment1.models.Recipe;
import com.gbc.assignment1.security.TokenManager;

import lombok.RequiredArgsConstructor;

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
        AppUser user = _userService.getUser(username);

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

        AppUser user = _userService.getUser(TokenManager.getUsernameFromToken(token));
        return ResponseEntity.ok().body(new UserProfileForm(user.getUsername(), user.getRecipes()));
    }

    @GetMapping("/mealplans/create")
    public ResponseEntity<?> createMealPlan(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @RequestBody MealPlanForm form
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Date st = new Date(form.getTimestamp());
        AppUser user = _userService.getUser(TokenManager.getUsernameFromToken(token));
        Recipe recipe = _recipeService.getRecipe(form.getRecipeId());

        if (recipe == null) {
            return new ResponseEntity<>("Recipe not found.", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(_mealplanService.createMealPlan(user, recipe, st));
    }
}
