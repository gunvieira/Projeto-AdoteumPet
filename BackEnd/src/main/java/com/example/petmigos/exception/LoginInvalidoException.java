package com.example.petmigos.exception;

public class LoginInvalidoException extends RuntimeException {
    public LoginInvalidoException(String message) {
        super(message);
    }
}
