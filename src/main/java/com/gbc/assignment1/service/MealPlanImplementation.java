package com.gbc.assignment1.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.gbc.assignment1.models.AppUser;
import com.gbc.assignment1.models.MealPlan;
import com.gbc.assignment1.models.Recipe;
import com.gbc.assignment1.repo.MealPlanRepo;
import com.gbc.assignment1.repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MealPlanImplementation implements MealPlanService {
    private final UserRepo _userRepo;
    private final MealPlanRepo _mealplanRepo;

    @Override
    public MealPlan createMealPlan(AppUser user, Recipe recipe, Date date) {
        MealPlan mp = new MealPlan(null, user.getId(), recipe.getId(), date);
        user.getMealplans().add(mp);
        _userRepo.save(user);
        return _mealplanRepo.save(mp);
    }

    @Override
    public MealPlan getMealPlan(Long id) {
        return _mealplanRepo.findByMealPlanId(id);
    }

    @Override
    public List<MealPlan> getMealPlansWithinRange(AppUser user, Date startDate, Date endDate) {
        return _mealplanRepo.findByUserIdAndDateBetween(user.getId(), startDate, endDate);
    }

}
