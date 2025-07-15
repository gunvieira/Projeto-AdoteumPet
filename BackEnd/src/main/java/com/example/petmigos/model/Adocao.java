package com.example.petmigos.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Adocao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int idAdocao;

    @Column(nullable = false)
    private Date dataAdocao;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnoreProperties("listaDeAdocao")
    private Usuario usuario;

    @OneToOne
    @JoinColumn(name = "id_animal", referencedColumnName = "idAnimal")
    private Animal animal;

    public Adocao(Date dataAdocao, Usuario usuario, Animal animal) {
        this.dataAdocao = dataAdocao;
        this.usuario = usuario;
        this.animal = animal;
    }
}
