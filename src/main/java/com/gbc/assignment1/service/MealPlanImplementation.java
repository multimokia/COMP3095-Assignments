/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Meal Plan implementatin
*/
package com.gbc.assignment1.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.gbc.assignment1.formtypes.MealPlanDispForm;
import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.MealPlan;
import com.gbc.assignment1.models.Recipe;
import com.gbc.assignment1.repo.MealPlanRepo;
import com.gbc.assignment1.repo.RecipeRepo;
import com.gbc.assignment1.repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MealPlanImplementation implements MealPlanService {
    private final UserRepo _userRepo;
    private final RecipeRepo _recipeRepo;
    private final MealPlanRepo _mealplanRepo;

    @Override
    public MealPlan createMealPlan(AppUser user, Recipe recipe, Date date, String eventName) {
        MealPlan mp = new MealPlan(null, user.getId(), recipe.getId(), date, eventName);
        user.getMealplans().add(mp);
        _mealplanRepo.save(mp);
        _userRepo.save(user);

        return mp;
    }

    @Override
    public MealPlan deleteMealPlan(AppUser user, Long mealplanId) {
        MealPlan toDelete = null;
        for (MealPlan mp : user.getMealplans()) {
            if (mp.getId() == mealplanId) {
                toDelete = mp;
                break;
            }
        }

        if (toDelete != null) {
            user.getMealplans().remove(toDelete);
            _mealplanRepo.delete(toDelete);
        }

        return toDelete;
    }

    @Override
    public MealPlan saveMealPlan(MealPlan mealplan) {
        return _mealplanRepo.save(mealplan);
    }

    @Override
    public MealPlan getMealPlan(Long id) {
        return _mealplanRepo.findById(id).get();
    }

    @Override
    public List<MealPlan> getMealPlansWithinRange(AppUser user, Date startDate, Date endDate) {
        return _mealplanRepo.findAllByUserIdAndDateBetween(user.getId(), startDate, endDate);
    }

    @Override
    public List<MealPlan> getAllForUser(AppUser user) {
        return _mealplanRepo.findAllByUserIdOrderByDateAsc(user.getId());
    }

    @Override
    public List<MealPlanDispForm> getAllMealPlansForUserDisp(AppUser user) {
        List<MealPlanDispForm> rv = new ArrayList<>();

        for (MealPlan mealplan : getAllForUser(user)) {
            Recipe recipe = _recipeRepo.findById(mealplan.getRecipeId()).get();

            rv.add(new MealPlanDispForm(
                mealplan,
                user,
                recipe
            ));
        }

        return rv;
    }

    @Override
    public List<MealPlanDispForm> getAllEventsForUserdisp(AppUser user) {
        List<MealPlanDispForm> rv = new ArrayList<>();

        for (MealPlan mealplan : getAllForUser(user)) {
            Recipe recipe = _recipeRepo.findById(mealplan.getRecipeId()).get();

            if (mealplan.getEventName() != null) {
                rv.add(new MealPlanDispForm(
                    mealplan,
                    user,
                    recipe
                ));
            }
        }

        return rv;
    }
}
