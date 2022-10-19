package com.gbc.assignment1.api;

import java.util.List;

import javax.naming.NameNotFoundException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gbc.assignment1.formtypes.RecipeDispForm;
import com.gbc.assignment1.formtypes.RecipeInfoForm;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;
import com.gbc.assignment1.security.TokenManager;
import com.gbc.assignment1.service.RecipeService;
import com.gbc.assignment1.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RecipeResource {
    private final RecipeService _recipeService;
    private final UserService _userService;

    private Boolean isValidJWT(String token) {
        if (token == null) {
            return false;
        }

        String username = TokenManager.getUsernameFromToken(token);
        AppUser user = _userService.getUserByUsername(username);

        if (user == null) {
            return false;
        }

        return TokenManager.validateJwtToken(token.replace("Bearer ", ""), user);
    }

    @GetMapping("/recipes")
    public ResponseEntity<List<RecipeDispForm>> getRecipes(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @RequestParam(required=false) String name,
        @RequestParam(required=false, defaultValue="0") int page,
        @RequestParam(required=false, defaultValue="4") int limit
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // Otherwise complete request
        return ResponseEntity.ok(_recipeService.getRecipesByName(
            (name != null) ? name : "",
            page,
            limit
        ));
    }

    @GetMapping("/recipes/{id}")
    public ResponseEntity<?> getRecipe(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable Long id) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>("Unauthorized.", HttpStatus.UNAUTHORIZED);
        }

        try {
            RecipeDispForm recipe = _recipeService.getRecipeDisp(id);
            // Otherwise complete request
            return ResponseEntity.ok(recipe);
        }

        catch (NameNotFoundException ex) {
            return new ResponseEntity<>("Not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/recipes/create")
    public ResponseEntity<Recipe> createRecipe(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
        @RequestBody RecipeInfoForm form
    ) {
        // Verify user is logged in
        if (!isValidJWT(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (form.getName() == null || form.getSteps() == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        AppUser user = _userService.getUserByUsername(TokenManager.getUsernameFromToken(token));

        return ResponseEntity.ok(
            _recipeService.createRecipe(
                form.getName(),
                form.getSteps(),
                user
            )
        );
    }
}
