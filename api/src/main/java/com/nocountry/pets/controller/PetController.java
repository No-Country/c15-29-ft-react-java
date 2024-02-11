package com.nocountry.pets.controller;

import com.nocountry.pets.controller.request.PetDTO;
import com.nocountry.pets.models.Pet;
import com.nocountry.pets.service.PetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api/pet")
public class PetController {

    @Autowired
    private PetService petService;


    @GetMapping("/getAll")
    public ResponseEntity<List<Pet>> getAllPets() {
        List<Pet> pets = petService.getAllPets();
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/getAllByAdopt/{adopted}")
    public ResponseEntity<List<Pet>> getAllforAdopt(@PathVariable Boolean adopted) {
        List<Pet> pets = petService.getAllByAdopted(adopted);
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        Optional<Pet> pet = petService.getPetById(id);
        return pet.map(value -> ResponseEntity.ok(value)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{petId}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long petId, @Valid @ModelAttribute PetDTO updatedPet) {
        Optional<Pet> result = petService.updatePet(petId, updatedPet);

        return result.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        boolean success = petService.deletePet(id);
        return success ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping()
    public ResponseEntity<Pet> newImage(@Valid @RequestBody PetDTO pet) {
        System.out.println("entro");
        try {
            Pet createdPet = petService.createPet(pet);
            System.out.println(createdPet.toString());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @GetMapping("/getPetByUserId/{id_user}")
//    public ResponseEntity<List<Pet>> obtenerMascotasPorUsuario(@PathVariable Long id_user) {
//        List<Pet> petsById = petService.getAllPetsByUserId(id_user);
//
//        if (petsById.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } else {
//            return new ResponseEntity<>(petsById, HttpStatus.OK);
//        }
//    }

    @GetMapping("/getPetByUserId/{idUser}")
    public ResponseEntity<List<Pet>> obtenerMascotasPorUsuario(@PathVariable Long idUser) {
        List<Pet> petsById = petService.getAllPetsByUserId(idUser);

        if (petsById.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(petsById, HttpStatus.OK);
        }
    }
}