package com.gbc.assignment1.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gbc.assignment1.models.AppUser;

public interface UserRepo extends JpaRepository<AppUser, Long>{
    AppUser findByUsername(String username);
}
