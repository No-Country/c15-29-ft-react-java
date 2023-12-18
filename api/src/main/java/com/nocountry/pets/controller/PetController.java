package com.nocountry.pets.controller;

import com.nocountry.pets.controller.request.CreateUserDTO;
import com.nocountry.pets.controller.request.PetDTO;
import com.nocountry.pets.models.Pet;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.PetRepository;
import com.nocountry.pets.repositories.UserRepository;
import com.nocountry.pets.service.PetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api/pet")
public class PetController {

    @Autowired
    private PetService petService;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

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

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @ModelAttribute Pet updatedPet) {
        Optional<Pet> pet = petService.updatePet(id, updatedPet);
        return pet.map(value -> ResponseEntity.ok(value)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        boolean success = petService.deletePet(id);
        return success ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping()
    public ResponseEntity<Pet> createPet(@Valid @ModelAttribute PetDTO petDto) {
        try {
            Pet createdPet = petService.createPet(petDto);
            System.out.println(createdPet.toString());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/helloSecured")
    public void helloSecured(){
        String authUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("USERNAME : " + authUsername );
        UserEntity user = userRepository.findByUsername(authUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        System.out.println("Datos del usuario : " + user.toString());

    }

}