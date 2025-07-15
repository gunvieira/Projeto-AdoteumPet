package com.example.petmigos.dto;

import com.example.petmigos.model.Animal;

public record AnimalRequestDTO(Animal animal, int idUsuario) {
}
