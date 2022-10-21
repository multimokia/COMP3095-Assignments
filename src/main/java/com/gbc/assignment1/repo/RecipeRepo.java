package com.gbc.assignment1.repo;

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gbc.assignment1.formtypes.IRecipeDispForm;
import com.gbc.assignment1.formtypes.RecipeDispForm;
import com.gbc.assignment1.models.Recipe;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {
    Recipe findByName(String name);
    Page<Recipe> findByNameContains(String name, Pageable pageable);

    @Query(
        value="SELECT RECIPES.ID, RECIPES.NAME, RECIPES.STEPS, USERS.USERNAME FROM RECIPES INNER JOIN USERS ON USERS.USER_ID=RECIPES.AUTHOR_ID WHERE RECIPES.NAME LIKE %:rNameFlt% AND USERS.USERNAME LIKE %:uNameFlt%",
        nativeQuery=true
    )
    Page<IRecipeDispForm> findAllByNameContainsAndUsernameContains(@Param("rNameFlt") String rNameFlt, @Param("uNameFlt") String uNameFlt, Pageable pageable);
}
