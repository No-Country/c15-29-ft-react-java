package com.nocountry.pets.service;


import com.nocountry.pets.controller.request.PetDTO;
import com.nocountry.pets.models.Pet;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.PetRepository;
import com.nocountry.pets.repositories.UserRepository;
import com.nocountry.pets.service.impl.S3ServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;


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

    @Autowired
    S3ServiceImpl s3Service;

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
    public Pet createPet(PetDTO petDto) {
        List<byte[]> dataImages = petDto.getImages().stream()
        .map( image -> {
            try {
                return image.getBytes();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        })
        .toList();

        Pet pet = Pet.builder()
                .name(petDto.getName())
                .age(petDto.getAge())
                .adopted(petDto.getAdopted())
                .breed(petDto.getBreed())
                .behavior(petDto.getBehavior())
                .colour(petDto.getColour())
                .size(petDto.getSize())
                .sterilized(petDto.getSterilized())
                .vaccinated(petDto.getVaccinated())
                .generalDescription(petDto.getGeneralDescription())
                .healthStatus(petDto.getHealthStatus())
                .images(null)
                .location(petDto.getLocation())
                .build();
        //get user data from session
        UserEntity userLogged = sessionService.getUserLogged();
        //set relations
        pet.setUser_id(userLogged);
        userLogged.getPets().add(pet);
        Pet petSaved = petRepository.save(pet);
        List<String> pathImages = s3Service.uploadMultipleObjects(dataImages, petSaved.getId());
        petSaved.setImages(pathImages);
        return petRepository.save(petSaved);
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

