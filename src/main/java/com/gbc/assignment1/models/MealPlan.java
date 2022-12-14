/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: mealplan entity class
*/

package com.gbc.assignment1.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.micrometer.core.lang.Nullable;
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
    private Date date;

    @Nullable
    @Column(name="eventName", nullable=true)
    private String eventName;
}
