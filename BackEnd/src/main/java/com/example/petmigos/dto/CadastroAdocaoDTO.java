package com.example.petmigos.dto;

import java.util.Date;

public record CadastroAdocaoDTO(Date dataAdocao, int idUsuario, int idAnimal, String status ) {
}
