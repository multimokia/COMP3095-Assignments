/*
* Project: Cookbook Webapp
* Assignment: Assignment 1
* Author(s): Stanley Tsonev, Minkyu Kim, Mehrad Heidari, Misty D'mello
* Student Number: 101339387, 101003196, 101332152, 101331770
* Date: 2022-10-23
* Description: Data form returned for the user's profiel
*/
package com.gbc.assignment1.formtypes;

import io.micrometer.core.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditUserForm {
    @Nullable
    private String password;

    @Nullable
    // Base64 encoded image
    private String avatar;
}
