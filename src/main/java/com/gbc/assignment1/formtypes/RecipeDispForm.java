package com.gbc.assignment1.formtypes;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RecipeDispForm {
    private Long id;
    private String name;
    private String steps;
    private String author;

    public RecipeDispForm(Long recipeId, String name, String steps, String author) {
        this.id = recipeId;
        this.name = name;
        this.steps = steps;
        this.author = author;
    }
}
