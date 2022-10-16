package com.gbc.assignment1.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gbc.assignment1.service.UserService;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.Recipe;
import com.gbc.assignment1.security.TokenManager;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserResource {
    private final UserService _userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody LoginUserForm form) {
        AppUser user = _userService.getUser(form.getUsername());

        //Stop if conflicting user
        if (user != null) {
            return new ResponseEntity<>("Conflict.", HttpStatus.CONFLICT);
        }

        //Continue
        user = new AppUser(
            null,
            form.getUsername(),
            BCrypt.hashpw(form.getPassword(), BCrypt.gensalt()),
            new ArrayList<>()
        );

        _userService.saveUser(user);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/signup").toUriString());
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserForm form) {
        AppUser user = _userService.getUser(form.getUsername());

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        if (BCrypt.checkpw(form.getPassword(), user.getPassword())) {
            Map<String, Object> map = new HashMap<>();

            TokenManager tm = new TokenManager();
            map.put("jwt", tm.generateJwtToken(user));
            return ResponseEntity.ok(map);
        }

        return new ResponseEntity<>("Unauthorized.", HttpStatus.UNAUTHORIZED);
    }

    @PatchMapping
    public ResponseEntity<Recipe> saveRecipe(@RequestBody Recipe recipe) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/recipe/save").toUriString());
        return ResponseEntity.created(uri).body(_userService.saveRecipe(recipe));
    }
}

@Data
class RecipeToUserForm {
    private String username;
    private String recipeName;
}

@Data
class LoginUserForm {
    private String username;
    private String password;
}
