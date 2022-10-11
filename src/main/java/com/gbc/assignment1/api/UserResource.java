package com.gbc.assignment1.api;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gbc.assignment1.service.UserService;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserResource {
    private final UserService _userService;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok().body(_userService.getUsers());
    }

    @PostMapping("/user/save")
    public ResponseEntity<AppUser> saveUser(@RequestBody AppUser user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(_userService.saveUser(user));
    }

    @PostMapping("/recipe/save")
    public ResponseEntity<Recipe> saveRecipe(@RequestBody Recipe recipe) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/recipe/save").toUriString());
        return ResponseEntity.created(uri).body(_userService.saveRecipe(recipe));
    }

    @PostMapping("/recipe/addtouser")
    public ResponseEntity<?> addRecipeToUser(@RequestBody RecipeToUserForm form) {
        _userService.addRecipeToUser(form.getUsername(), form.getRecipeName());
        return ResponseEntity.ok().build();
    }
}

@Data
class RecipeToUserForm {
    private String username;
    private String recipeName;
}
