package com.example.petmigos.repository;

import com.example.petmigos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Usuario findById(int id);

    Usuario findByEmail(String email);
}
