package com.gbc.assignment1.exceptions;

import org.springframework.security.core.AuthenticationException;

public class UserAlreadyExistsException extends AuthenticationException {
    public UserAlreadyExistsException(String msg) {
        super(msg);
    }
}
