/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Dataclass for the Meal plan display form
*/
package com.gbc.assignment1.formtypes;

import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.MealPlan;
import com.gbc.assignment1.models.Recipe;

import lombok.Data;

@Data
public class MealPlanDispForm {
    Long id;
    Long timestamp;
    RecipeDispForm recipeData;
    String eventName;

    public MealPlanDispForm(MealPlan mealplan, AppUser user, Recipe recipe) {
        this.id = mealplan.getId();
        this.timestamp = mealplan.getDate().getTime();
        this.recipeData = new RecipeDispForm(
            recipe.getId(),
            recipe.getName(),
            recipe.getSteps(),
            user.getUsername()
        );
        this.eventName = mealplan.getEventName();
    }
}
