package com.example.petmigos.controller;

import com.example.petmigos.dto.CadastroUserDto;
import com.example.petmigos.dto.LoginUserDTO;
import com.example.petmigos.dto.UsuarioLoginResponseDTO;
import com.example.petmigos.model.Usuario;
import com.example.petmigos.service.Usuario.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UsuarioController {

    @Autowired
    private IUsuarioService service;

    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody CadastroUserDto userDto) {
        Usuario user = service.cadastrarUsuario(userDto);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> mostrarInformacoes(@PathVariable("id") int id) {
        return ResponseEntity.ok(service.mostrarInformacoes(id));
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioLoginResponseDTO> fazerLogin(@RequestBody LoginUserDTO loginUserDto) {
        UsuarioLoginResponseDTO user = service.fazerLogin(loginUserDto);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().build();
    }
}
