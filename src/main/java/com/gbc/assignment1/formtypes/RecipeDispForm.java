package com.gbc.assignment1.formtypes;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RecipeDispForm implements IRecipeDispForm {
    private Long id;
    private String name;
    private String steps;
    private String author;

    public RecipeDispForm(Long id, String name, String steps, String username) {
        this.id = id;
        this.name = name;
        this.steps = steps;
        this.author = username;
    }

    public static RecipeDispForm fromObject(Object obj) {
        return (RecipeDispForm)obj;
    }
}
