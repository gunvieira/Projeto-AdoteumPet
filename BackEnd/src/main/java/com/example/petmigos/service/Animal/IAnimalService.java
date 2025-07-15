package com.example.petmigos.service.Animal;

import com.example.petmigos.dto.AnimalRequestDTO;
import com.example.petmigos.model.Animal;

import java.util.List;

public interface IAnimalService {

    Animal adicionarAnimal(AnimalRequestDTO animalDto);

    List<Animal> listarAnimais();

    Animal mostrarInformacoes(int id);
}
