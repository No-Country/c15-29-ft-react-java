package com.nocountry.pets.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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
    @Size(min=2,max = 20, message = "Name must be between 2 and 20 characters.")
    private String name;

    @Size(min=2,max = 20, message = "Breed must be between 2 and 20 characters.")
    private String breed;
    @Size(max = 2, message = "Age must be minor to 99.")
    private Integer age;

    @Size(max = 30, message = "Colour cannot exceed 30 characters.")
    private String colour;

    private Double weight;

    private List<String> images;

    @Size(min= 15,max = 150, message = "generalDescription cannot exceed 150 characters.")
    private String generalDescription;

    @Size(min= 15,max = 150, message = "Behavior cannot exceed 150 characters.")
    private String behavior;

    private Boolean vaccinated = false;

    private Boolean sterilized = false;

    private Boolean adopted = false;

    private Boolean adoptionInProcess = false;


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
                ", images=" + images +
                ", sterilized=" + sterilized +
                ", adopted=" + adopted +
                ", behavior='" + behavior + '\'' +
                '}';
    }


}
