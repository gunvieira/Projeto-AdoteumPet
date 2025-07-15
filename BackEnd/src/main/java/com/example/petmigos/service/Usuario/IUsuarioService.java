package com.example.petmigos.service.Usuario;

import com.example.petmigos.dto.CadastroUserDto;
import com.example.petmigos.dto.LoginUserDTO;
import com.example.petmigos.dto.UsuarioLoginResponseDTO;
import com.example.petmigos.model.Usuario;

public interface IUsuarioService {

    Usuario cadastrarUsuario(CadastroUserDto userDto);

    Usuario mostrarInformacoes(int id);

    void verificarDadosCadastro(CadastroUserDto userDto);

    UsuarioLoginResponseDTO fazerLogin(LoginUserDTO loginUserDto);

}
