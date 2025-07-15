package com.example.petmigos.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int idUsuario;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String cpf;

    @Column(nullable = false)
    private int tipoUsuario;

    @ManyToOne(cascade =CascadeType.ALL)
    @JoinColumn(name = "id_endereco")
    @JsonIgnoreProperties("listaUsuarios")
    private Endereco endereco;

    @OneToMany(mappedBy = "usuario")

    private List<Adocao> listaDeAdocao;

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public int getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(int tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public List<Adocao> getListaDeAdocao() {
        return listaDeAdocao;
    }

    public void setListaDeAdocao(List<Adocao> listaDeAdocao) {
        this.listaDeAdocao = listaDeAdocao;
    }
}
