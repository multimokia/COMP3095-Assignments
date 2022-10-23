/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Display format for recipes
*/
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
