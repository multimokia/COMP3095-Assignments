package com.gbc.assignment1.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gbc.assignment1.models.MealPlan;

public interface MealPlanRepo extends JpaRepository<MealPlan, Long> {
    List<MealPlan> findByUserId(Long userId);
    List<MealPlan> findByUserIdAndDateBetween(Long userId, Date startDate, Date endDate);
    List<MealPlan> findByUserIdAndDate(Long userId, Date date);
}
