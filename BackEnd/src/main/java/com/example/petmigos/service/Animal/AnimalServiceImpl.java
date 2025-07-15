package com.example.petmigos.service.Animal;

import com.example.petmigos.dto.AnimalRequestDTO;
import com.example.petmigos.exception.AcessoNegadoException;
import com.example.petmigos.model.Animal;
import com.example.petmigos.model.Usuario;
import com.example.petmigos.repository.AnimalRepository;
import com.example.petmigos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.rmi.AccessException;
import java.util.List;

@Service
public class AnimalServiceImpl implements IAnimalService {

    @Autowired
    private AnimalRepository animalRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Override
    public Animal adicionarAnimal(AnimalRequestDTO animalDto) {
        Usuario user = usuarioRepo.findById(animalDto.idUsuario());
        if (user == null) {
            throw new AcessoNegadoException("Usuário não encontrado");
        } else if (user.getTipoUsuario() != 1) {
            throw new AcessoNegadoException("Sem permissão para acesso");
        }
        return animalRepo.save(animalDto.animal());
    }

    @Override
    public List<Animal> listarAnimais() {
        List<Animal> animais = animalRepo.findAll();
        if (animais.isEmpty()) {
            throw new RuntimeException("Sem animais cadastrados");
        }
        return animais;
    }

    @Override
    public Animal mostrarInformacoes(int id) {
        return animalRepo.findById(id);
    }
}
