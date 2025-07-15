package com.example.petmigos.repository;

import com.example.petmigos.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Integer> {

    Animal findById(int id);
}
