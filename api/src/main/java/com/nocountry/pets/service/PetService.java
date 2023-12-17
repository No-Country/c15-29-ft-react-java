package com.nocountry.pets.service;


import com.nocountry.pets.controller.request.PetDTO;
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
import org.springframework.web.multipart.MultipartFile;

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

    public boolean deletePet(Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

//    public List<Pet> getPetByUserId (Long id_user) {
//        return petRepository.findByUserId(id_user);
//    }

    public Optional<Pet> updatePet(Long petId, PetDTO updatedPet) {
        Pet existingPet = petRepository.getByIdOrThrow(petId);

        if (updatedPet.getName() != null) {
            existingPet.setName(updatedPet.getName());
        }

        if (updatedPet.getBreed() != null) {
            existingPet.setBreed(updatedPet.getBreed());
        }

        if (updatedPet.getAge() != null) {
            existingPet.setAge(updatedPet.getAge());
        }

        if (updatedPet.getColour() != null) {
            existingPet.setColour(updatedPet.getColour());
        }

        if (updatedPet.getSize() != null) {
            existingPet.setSize(updatedPet.getSize());
        }

/*        if (updatedPet.getImages() != null) {

            for (int x = 1; updatedPet.getImages().size()>x; x++ ) {

                    String avatarLink = String.format("nocountry-pawfinder/%s/image/%s", existingPet.getId(), "thumbnail");
                    uploadAvatar(createUserDTO.getAvatar(), createUserDTO.getUsername());
                    userEntity.setAvatar(avatarLink);
            }*/

        if (updatedPet.getGeneralDescription() != null) {
            existingPet.setGeneralDescription(updatedPet.getGeneralDescription());
        }

        if (updatedPet.getBehavior() != null) {
            existingPet.setBehavior(updatedPet.getBehavior());
        }

        if (updatedPet.getHealthStatus() != null) {
            existingPet.setHealthStatus(updatedPet.getHealthStatus());
        }

        if (updatedPet.getLocation() != null) {
            existingPet.setLocation(updatedPet.getLocation());
        }

        if (updatedPet.getVaccinated() != null) {
            existingPet.setVaccinated(updatedPet.getVaccinated());
        }

        if (updatedPet.getSterilized() != null) {
            existingPet.setSterilized(updatedPet.getSterilized());
        }

        if (updatedPet.getAdopted() != null) {
            existingPet.setAdopted(updatedPet.getAdopted());
        }

        if (updatedPet.getAdoptionInProcess() != null) {
            existingPet.setAdoptionInProcess(updatedPet.getAdoptionInProcess());
        }

        return Optional.of(petRepository.save(existingPet));
    }


}

