package com.gbc.assignment1.api;

import java.net.URI;
import java.util.HashMap;

import javax.security.auth.login.CredentialException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gbc.assignment1.service.UserService;
import com.gbc.assignment1.exceptions.UserAlreadyExistsException;
import com.gbc.assignment1.models.Recipe;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserResource {
    private final UserService _userService;

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
