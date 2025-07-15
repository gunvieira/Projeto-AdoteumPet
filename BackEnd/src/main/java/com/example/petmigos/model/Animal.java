package com.example.petmigos.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table
@Entity
public class Animal {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int idAnimal;

    @Column(nullable = false)
    private String nome;

    @Column(name = "data_nas",nullable = false)
    private Date dataNasc;

    private Integer idUsuario;


    private String status;

    @OneToOne(mappedBy = "animal")
    @JsonBackReference("animal-adocao")
    private Adocao adocao;

    private String raca;

    private String especie;

    private String sexo;

    private String porte;

    private String midiaImagem;
}
