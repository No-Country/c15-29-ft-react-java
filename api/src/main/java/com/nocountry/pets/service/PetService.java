package com.nocountry.pets.service;

import com.nocountry.pets.controller.request.PetDTO;
import com.nocountry.pets.models.Pet;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.PetRepository;
import com.nocountry.pets.repositories.UserRepository;
import com.nocountry.pets.service.impl.S3ServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

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

//    public List<Pet> getAllPetsByUserId(Long id){
//        List<Pet> allPets = this.getAllPets();
//        List<Pet> allPetsByUser = allPets.stream()
//                .filter( pet -> pet.getUser_id().getId() == id)
//                .collect(Collectors.toList());
//        return allPetsByUser;
//    }

    public List<Pet> getAllPetsByUserId(Long id){
       List<Pet> pets = this.petRepository.findAllPetsByUserId(id);
       return pets;
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

    public boolean deletePet(Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

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

        if(updatedPet.getImages().size() > 0){
            s3Service.deleteMultiplesFiles(existingPet.getId().toString());
            List<byte[]> dataImages = updatedPet.getImages().stream()
                    .map( image -> {
                        try {
                            return image.getBytes();
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .toList();
            List<String> newImages = s3Service.uploadMultipleObjects(dataImages, existingPet.getId());
            existingPet.setImages(newImages);
        }

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

