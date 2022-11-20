/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Appuser entity class
*/
package com.gbc.assignment1.models;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class AppUser {
    @Id
    @Column(name="userId")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name="username", unique=true, nullable=false)
    private String username;

    @Column(name="password", nullable=false)
    private String password;

    @OneToMany
    @Column(name="recipes")
    private Collection<Recipe> recipes = new ArrayList<>();

    @OneToMany
    @Column(name="mealplans")
    private Collection<MealPlan> mealplans = new ArrayList<>();

    @OneToMany
    @Column(name="favorites")
    private Collection<Recipe> favorites = new ArrayList<>();
}
