package com.nocountry.pets.service;


import com.nocountry.pets.models.Pet;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.PetRepository;
import com.nocountry.pets.repositories.UserRepository;
import jakarta.transaction.Transactional;
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
    @Autowired
    private SessionService sessionService;

    public List<Pet> getAllPets() {
        return (List<Pet>) petRepository.findAll();
    }

    public List<Pet> getAllByAdopted(Boolean adopted) {

        return petRepository.findAllByAdopted(adopted);

    }

    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }

    @Transactional
    public Pet createPet(Pet pet) {

        //get user data from session
        UserEntity userLogged = sessionService.getUserLogged();
        //set relations
        pet.setUser_id(userLogged);
        userLogged.getPets().add(pet);
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

