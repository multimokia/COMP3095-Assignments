/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Info form for recipes (should be submitted to backend)
*/
package com.gbc.assignment1.formtypes;

import lombok.Data;

@Data
public class RecipeInfoForm {
    private String name;
    private String steps;
    private String ingredients;
}
