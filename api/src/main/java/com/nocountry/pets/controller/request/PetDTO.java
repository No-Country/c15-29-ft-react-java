package com.nocountry.pets.controller.request;

import com.nocountry.pets.models.UserEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Getter
@Setter
public class PetDTO {
        private UserEntity user_id;
        @NotBlank
        private String name;
        //private String type; //if its decided to place different animals(example: cats, dogs, parrots,etc.)
        private String breed;
        @Size(max = 2, message = "Age must be minor to 99.")
        private Integer age;

        @Size(max = 30, message = "Colour cannot exceed 30 characters.")
        private String colour;

        private Integer size;

        private List<MultipartFile> images;

        @Size(min=15,max=150, message = "generalDescription must be between 15 and 150 characters.")
        private String generalDescription;

        @Size(min= 4,max = 150, message = "Behavior must be between 4 and 150 characters.")
        private String behavior;
        @Size(min= 4,max = 150, message = "healthStatus must be between 4 and 150 characters.")
        private String healthStatus;
        @Size(min= 4,max = 40, message = "location must be between 4 and 40 characters.")
        private String location;

        private Boolean vaccinated = false;

        private Boolean sterilized = false;

        private Boolean adopted = false;

        private Boolean adoptionInProcess = false;

}
