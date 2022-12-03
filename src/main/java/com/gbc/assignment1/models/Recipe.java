/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Recipe entity class
*/

package com.gbc.assignment1.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@EqualsAndHashCode(exclude = "favoritedBy")
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name="recipes")
public class Recipe {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name="name")
    private String name;

    /**
     * This is delimited to ingredients to separate steps from each other.
     */
    @Column(name="ingredients")
    private String ingredients;

    @Column(name="authorId")
    private Long authorId;

    /**
     * This is delimited to ingredients to separate steps from each other.
     */
    @Column(name="steps")
    private String steps;

    @JsonIgnore
    @ManyToMany(mappedBy = "favorites")
    private Set<AppUser> favoritedBy = new HashSet<>();
}
