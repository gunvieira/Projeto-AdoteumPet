package com.example.petmigos.dto;

import com.example.petmigos.model.Endereco;

public record CadastroUserDto(String nome, String email, String senha, String telefone,
                              String cpf, Endereco endereco) {
}
