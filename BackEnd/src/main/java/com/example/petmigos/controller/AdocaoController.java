package com.example.petmigos.controller;

import com.example.petmigos.dto.AtualizarStatusDTO;
import com.example.petmigos.dto.CadastroAdocaoDTO;
import com.example.petmigos.model.Adocao;
import com.example.petmigos.service.Adocao.IAdocaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("adocoes")
public class AdocaoController {

    @Autowired
    private IAdocaoService adocaoService;

    @PostMapping
    public ResponseEntity<Adocao> adicionarAdocao(@RequestBody CadastroAdocaoDTO adocaoDto){
        Adocao res =  adocaoService.adicionarAdocao(adocaoDto);
        if (res != null){
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<List<?>> listarAdocao(@PathVariable int idUsuario){
        List<?> res = adocaoService.listarAdocao(idUsuario);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/status")
    public ResponseEntity<Adocao> atualizarStatus(@RequestBody AtualizarStatusDTO statusDto){
        Adocao res = adocaoService.atualizarStatus(statusDto);
        if (res != null){
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.badRequest().build();

    }

}
