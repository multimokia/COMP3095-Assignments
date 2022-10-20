package com.gbc.assignment1.formtypes;

import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.MealPlan;
import com.gbc.assignment1.models.Recipe;

public class MealPlanDispForm {
    Long id;
    Long timestamp;
    RecipeDispForm recipeData;

    public MealPlanDispForm(MealPlan mealplan, AppUser user, Recipe recipe) {
        this.id = mealplan.getId();
        this.timestamp = mealplan.getDate().getTime() / 1000; // Converting to time in seconds, not millis
        this.recipeData = new RecipeDispForm(
            recipe.getId(),
            recipe.getName(),
            recipe.getSteps(),
            user.getUsername()
        );
    }
}
