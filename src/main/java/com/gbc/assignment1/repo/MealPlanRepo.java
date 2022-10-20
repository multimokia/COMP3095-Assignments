package com.gbc.assignment1.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gbc.assignment1.models.MealPlan;

public interface MealPlanRepo extends JpaRepository<MealPlan, Long> {
    List<MealPlan> findByUserId(Long userId);
    List<MealPlan> findAllByUserIdAndDateBetween(Long userId, Date startDate, Date endDate);
    List<MealPlan> findAllByUserIdAndDate(Long userId, Date date);
    List<MealPlan> findAllByUserIdOrderByDateAsc(Long userId);
}
