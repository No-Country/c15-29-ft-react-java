package com.nocountry.pets.controller.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdoptionDTO {

    @NotNull
    Long id_realOwner;
    @NotNull
    Long id_newOwner;
    @NotNull
    Long id_pet;

}
