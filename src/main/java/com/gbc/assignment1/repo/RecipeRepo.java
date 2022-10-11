package com.gbc.assignment1.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gbc.assignment1.models.Recipe;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {
    Recipe findByName(String name);
}
