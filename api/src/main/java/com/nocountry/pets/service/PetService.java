package com.nocountry.pets.service;


import com.nocountry.pets.models.Pet;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.PetRepository;
import com.nocountry.pets.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Pet> getAllPets() {
        return (List<Pet>) petRepository.findAll();
    }

    public List<Pet> getAllByAdopted(Boolean adopted) {

        return petRepository.findAllByAdopted(adopted);

    }

    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }

    public Pet createPet(Pet pet) {
/*        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        System.out.println("USERNAME : " + username );
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));


        pet.setUser_id(user);

        System.out.println("Datos del usuario : " + user.getId());
        System.out.println("MASCOTA" + pet.toString());*/

        return petRepository.save(pet);
    }

    public Optional<Pet> updatePet(Long id, Pet updatedPet) {
        if (petRepository.existsById(id)) {
            updatedPet.setId(id);
            return Optional.of(petRepository.save(updatedPet));
        } else {
            return Optional.empty();
        }
    }

    public boolean deletePet(Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}

