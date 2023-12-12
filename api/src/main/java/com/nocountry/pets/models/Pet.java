package com.nocountry.pets.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private UserEntity user_id;

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


    @Override
    public String toString() {
        return "Pet{" +
                "id=" + id +
                ", user=" + (user_id != null ? user_id.getId() : null) +
                ", name='" + name + '\'' +
                ", breed='" + breed + '\'' +
                ", age=" + age +
                ", colour='" + colour + '\'' +
                ", vaccinated=" + vaccinated +
                ", weight=" + weight +
                ", height=" + height +
                ", images=" + images +
                ", sterilized=" + sterilized +
                ", adopted=" + adopted +
                ", behavior='" + behavior + '\'' +
                '}';
    }


}
