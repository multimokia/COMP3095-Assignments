/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Interface for Recipe Display Forms
*/
package com.gbc.assignment1.formtypes;

/*
 * I fully realize this isn't Java standard, however at the same time I
 * Also needed a bootleg converter because setting up a Bean converter is an absolutely
 * undocumented nightmare that I honestly cannot be bothered to deal with
*/
public interface IRecipeDispForm {
    Long getId();
    String getName();
    String getSteps();
    String getUsername();
}
