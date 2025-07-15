package com.example.petmigos.dto;

import com.example.petmigos.model.Animal;

import java.util.Date;

public record AdocaoResponseUserDTO(Animal animal, Date dataAdocao, String statusAnimal) {
}
