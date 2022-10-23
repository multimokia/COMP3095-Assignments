/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: user repository
*/
package com.gbc.assignment1.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gbc.assignment1.models.AppUser;

public interface UserRepo extends JpaRepository<AppUser, Long>{
    AppUser findByUsername(String username);
}
