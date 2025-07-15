package com.example.petmigos.service.Usuario;

import com.example.petmigos.dto.CadastroUserDto;
import com.example.petmigos.dto.LoginUserDTO;
import com.example.petmigos.dto.UsuarioLoginResponseDTO;
import com.example.petmigos.exception.EmailExistenteException;
import com.example.petmigos.exception.LoginInvalidoException;
import com.example.petmigos.exception.ValorVazioException;
import com.example.petmigos.model.Usuario;
import com.example.petmigos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario cadastrarUsuario(CadastroUserDto userDto) {
        verificarDadosCadastro(userDto);
        if (usuarioRepository.findByEmail(userDto.email()) != null) {
            throw new EmailExistenteException("Email já cadastrado");
        }
        Usuario user = Usuario.builder()
                .nome(userDto.nome().toLowerCase())
                .email(userDto.email().toLowerCase())
                .senha(userDto.senha())
                .telefone(userDto.telefone())
                .cpf(userDto.cpf())
                .endereco(userDto.endereco())
                .tipoUsuario(0)
                .build();
        return usuarioRepository.save(user);
    }

    @Override
    public Usuario mostrarInformacoes(int id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public void verificarDadosCadastro(CadastroUserDto userDto) {

        if (userDto.nome() == null || userDto.nome().trim().isEmpty()){
            throw new ValorVazioException("O campo nome precisa estar preenchido");
        }
        if (userDto.email() == null || userDto.email().trim().isEmpty()){
            throw new ValorVazioException("O campo email precisa estar preenchido");
        }
        if (userDto.senha() == null || userDto.senha().trim().isEmpty()){
            throw new ValorVazioException("O campo senha precisa estar preenchido");
        }
        if (userDto.telefone() == null || userDto.telefone().trim().isEmpty()){
            throw new ValorVazioException("O campo nome precisa estar preenchido");
        }
        if (userDto.cpf() == null || userDto.cpf().trim().isEmpty()){
            throw new ValorVazioException("O campo nome precisa estar preenchido");
            // dps validar cpf
        }
        if (userDto.endereco().getNumero() <=0 ){
            throw new ValorVazioException("O campo numero não pode ser negativo");
        }
        if (userDto.endereco().getLogradouro() == null ||  userDto.endereco().getLogradouro().trim().isEmpty()){
            throw new ValorVazioException("O campo logradouro precisa estar preenchido");
        }
    }

    @Override
    public UsuarioLoginResponseDTO fazerLogin(LoginUserDTO loginUserDto) {
        Usuario user = usuarioRepository.findByEmail(loginUserDto.email().toLowerCase());
        if (user == null || !user.getSenha().trim().equals(loginUserDto.senha().trim())){
            throw new LoginInvalidoException("Login Inválido");
        }
        return new UsuarioLoginResponseDTO(user.getIdUsuario(), user.getNome(), user.getEmail(), user.getTipoUsuario());
    }
}
