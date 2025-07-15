package com.example.petmigos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(ValorVazioException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public void valorVazio(){}

    @ExceptionHandler(EmailExistenteException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public void emailExistente(){}

    @ExceptionHandler(LoginInvalidoException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public void loginInvalido(){}

    @ExceptionHandler(AcessoNegadoException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public void acessoNegado(){}

    @ExceptionHandler(SemConteudoException.class)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void semConteudo(){}

}
