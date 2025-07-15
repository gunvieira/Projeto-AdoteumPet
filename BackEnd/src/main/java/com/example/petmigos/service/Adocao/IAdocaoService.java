package com.example.petmigos.service.Adocao;

import com.example.petmigos.dto.AtualizarStatusDTO;
import com.example.petmigos.dto.CadastroAdocaoDTO;
import com.example.petmigos.model.Adocao;

import java.util.List;

public interface IAdocaoService {

    Adocao adicionarAdocao(CadastroAdocaoDTO adocaoDto);

    List<?> listarAdocao(int idUsuario);

    Adocao atualizarStatus(AtualizarStatusDTO statusDto);
}
