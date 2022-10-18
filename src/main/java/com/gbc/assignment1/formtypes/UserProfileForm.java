package com.gbc.assignment1.formtypes;

import java.util.Collection;

import com.gbc.assignment1.models.Recipe;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileForm {
    private String username;
    private Collection<Recipe> recipes;
}
