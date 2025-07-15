package com.example.petmigos.controller;

import com.example.petmigos.dto.AnimalRequestDTO;
import com.example.petmigos.model.Animal;
import com.example.petmigos.model.Usuario;
import com.example.petmigos.service.Animal.IAnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("animais")
public class AnimalController {

    @Autowired
    private IAnimalService animalService;

    @PostMapping
    public ResponseEntity<Animal> adicionarAnimal(@RequestBody AnimalRequestDTO animalDto) {
        Animal res = animalService.adicionarAnimal(animalDto);
        if (res != null) {
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping
    public ResponseEntity<List<Animal>> listarAnimais() {
        List<Animal> res = animalService.listarAnimais();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> mostrarInformacoes(@PathVariable("id") int id) {
        return ResponseEntity.ok(animalService.mostrarInformacoes(id));
    }
}
