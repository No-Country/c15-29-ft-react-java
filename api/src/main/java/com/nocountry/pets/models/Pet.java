package com.nocountry.pets.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity owner;

    private String name;
    //private String type; //if its decided to place different animals(example: cats, dogs, parrots,etc.)
    private String breed;
    private Integer age;
    private String colour;
    private Boolean vaccinated;
    private Double weight;
    private Double height;
    private List<String> images;
    private Boolean sterilized;
    private Boolean adopted;
    private String behavior;


}
