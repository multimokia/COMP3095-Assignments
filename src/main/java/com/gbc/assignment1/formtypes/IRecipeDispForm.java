package com.gbc.assignment1.formtypes;

/*
 * I fully realize this isn't Java standard, however at the same time I
 * Also needed a bootleg converted because setting up a Bean converter is an absolutely
 * undocumented nightmare that I honestly cannot be bothered to deal with
*/
public interface IRecipeDispForm {
    Long getId();
    String getName();
    String getSteps();
    String getAuthor();
}
