/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Misty D'mello
* Student Number: 101331770
* Date: 2022-10-23
* Description: Meal plan interface
*/
package com.gbc.assignment1.service;

import java.util.Date;
import java.util.List;

import com.gbc.assignment1.formtypes.MealPlanDispForm;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.MealPlan;
import com.gbc.assignment1.models.Recipe;

public interface MealPlanService {
    MealPlan createMealPlan(AppUser user, Recipe recipe, Date date, String eventName);
    MealPlan deleteMealPlan(AppUser user, Long mealplanId);
    MealPlan getMealPlan(Long id);
    List<MealPlan> getMealPlansWithinRange(AppUser user, Date startDate, Date endDate);
    List<MealPlan> getAllForUser(AppUser user);
    List<MealPlanDispForm> getAllMealPlansForUserDisp(AppUser user);
    List<MealPlanDispForm> getAllEventsForUserdisp(AppUser user);
}
