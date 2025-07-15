package com.example.petmigos.exception;

public class EmailExistenteException extends RuntimeException {
    public EmailExistenteException(String message) {
        super(message);
    }
}
