package com.example.petmigos.service.Adocao;

import com.example.petmigos.dto.AdocaoResponseUserDTO;
import com.example.petmigos.dto.AtualizarStatusDTO;
import com.example.petmigos.dto.CadastroAdocaoDTO;
import com.example.petmigos.exception.AcessoNegadoException;
import com.example.petmigos.exception.SemConteudoException;
import com.example.petmigos.exception.ValorVazioException;
import com.example.petmigos.model.Adocao;
import com.example.petmigos.model.Animal;
import com.example.petmigos.model.Usuario;
import com.example.petmigos.repository.AdocaoRepository;
import com.example.petmigos.repository.AnimalRepository;
import com.example.petmigos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdocaoServiceImpl implements IAdocaoService{

    @Autowired
    private AdocaoRepository adocaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Override
    @Transactional
    public Adocao adicionarAdocao(CadastroAdocaoDTO adocaoDto) {
        Usuario userAdotante = usuarioRepository.findById(adocaoDto.idUsuario());
        Animal animalAdotante = animalRepository.findById(adocaoDto.idAnimal());
        if (userAdotante == null ) {
            throw new AcessoNegadoException("Usuário precisa estar logado");
        }
        if (animalAdotante == null) {
            throw new ValorVazioException("É necessário um animal para adotar");
        }

        animalAdotante.setStatus("PENDENTE");
        Adocao adocao = new Adocao(adocaoDto.dataAdocao(), userAdotante, animalAdotante);

        return adocaoRepository.save(adocao);
    }

    @Override
    public List<?> listarAdocao(int idUsuario) {
        Usuario user = usuarioRepository.findById(idUsuario);
        if (user == null) {
            throw new AcessoNegadoException("Usuário não encontrado");
        }
        List<Adocao> adocoes = adocaoRepository.findAll();
        if (adocoes.isEmpty()) {
            throw new SemConteudoException("Não há adoções");
        }
        if (user.getTipoUsuario() == 0) {
            return adocoes.stream()
                    .filter(a -> a.getUsuario().getIdUsuario() == user.getIdUsuario())
                    .map(a -> new AdocaoResponseUserDTO(a.getAnimal(), a.getDataAdocao(), a.getAnimal().getStatus()))
                    .toList();
        }
        return adocoes;
    }

    @Override
    @Transactional
    public Adocao atualizarStatus(AtualizarStatusDTO statusDto) {
        Adocao adocao = adocaoRepository.findById(statusDto.idAdocao());
        if (adocao == null) {
            throw new ValorVazioException("Não há adoção para atualizar");
        }

        Animal animal = adocao.getAnimal();
        if (animal == null) {
            throw new ValorVazioException("Adoção não está associada a nenhum animal.");
        }

        if ("APROVADO".equals(statusDto.status())) {
            animal.setStatus(statusDto.status());
            animalRepository.save(animal);
        }  else if ("RECUSADO".equals(statusDto.status())) {
            animal.setStatus("CADASTRADO");
            animal.setAdocao(null);
            animalRepository.save(animal);
            adocaoRepository.delete(adocao);
        }
        return adocao;
    }
}
