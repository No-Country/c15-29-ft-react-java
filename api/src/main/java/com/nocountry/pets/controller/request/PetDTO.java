package com.nocountry.pets.controller.request;

import com.nocountry.pets.models.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class PetDTO {
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
}
