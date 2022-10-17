package com.gbc.assignment1.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="mealplans")
public class MealPlan {
    @Id
    @Column(name="mealplanId")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name="userId")
    private Long userId;

    @Column(name="recipeId")
    private Long recipeId;

    @Column(name="date")
    private Long date;
}
