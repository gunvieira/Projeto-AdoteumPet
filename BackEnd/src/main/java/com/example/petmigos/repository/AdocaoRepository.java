package com.example.petmigos.repository;

import com.example.petmigos.model.Adocao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdocaoRepository extends JpaRepository<Adocao, Integer> {

    Adocao findById(int id);
}
