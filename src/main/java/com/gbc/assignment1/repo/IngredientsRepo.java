package com.gbc.assignment1.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gbc.assignment1.models.Ingredient;

public interface IngredientsRepo extends JpaRepository<Ingredient, Long>{
    List<Ingredient> findAllByName(String name);
    List<Ingredient> findAllByPriceGreaterThan(String name);
}
