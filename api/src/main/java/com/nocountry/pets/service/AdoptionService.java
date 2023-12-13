package com.nocountry.pets.service;

import com.nocountry.pets.controller.AdoptionController;
import com.nocountry.pets.models.AdoptionEntity;
import com.nocountry.pets.models.Pet;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.AdoptionRepository;
import com.nocountry.pets.repositories.PetRepository;
import com.nocountry.pets.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AdoptionService {
        //when the users ended whatsapp comunnication, the new Owner starts an adoption process
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private PetRepository petRepository;
        @Autowired
        private AdoptionRepository adoptionRepository;

        public AdoptionEntity newAdoption(Long id_realOwner , Long id_newOwner, Long id_pet ){

                UserEntity realOwner = userRepository.getByIdOrThrow(id_realOwner);
                UserEntity newOwner = userRepository.getByIdOrThrow(id_newOwner);
                Pet pet= petRepository.getByIdOrThrow(id_pet);

                AdoptionEntity adoption = AdoptionEntity.builder()
                        .dateStarted(LocalDateTime.now())
                        .newOwner(newOwner)
                        .realOwner(realOwner)
                        .pet(pet)
                        .newOwnerConfirm(false)
                        .realOwnerConfirm(false)
                        .build();
                return adoptionRepository.save(adoption);
        }

        public void confirmAdoption(Long id_userConfirm, Long id_adoption){
                UserEntity userEntity = userRepository.getByIdOrThrow(id_userConfirm);
                AdoptionEntity adoptionInProcess = adoptionRepository.getByIdOrThrow(id_adoption);
                //
                if(adoptionInProcess.getNewOwner().getId() == userEntity.getId()){
                      adoptionInProcess.setNewOwnerConfirm(true);
                      adoptionRepository.save(adoptionInProcess);

                }
                if(adoptionInProcess.getRealOwner().getId() == userEntity.getId()){
                        adoptionInProcess.setRealOwnerConfirm(true);
                        adoptionRepository.save(adoptionInProcess);
                }
                if(adoptionInProcess.getNewOwnerConfirm() && adoptionInProcess.getRealOwnerConfirm()){
                        //save date and status "complete"
                        adoptionInProcess.setDateCompleted(LocalDateTime.now());
                        adoptionInProcess.setAdoptionCompleted(true);
                        adoptionRepository.save(adoptionInProcess);
                        //
                        Pet petInProgress = petRepository.getByIdOrThrow(adoptionInProcess.getPet().getId());
                        petInProgress.setUser_id(adoptionInProcess.getNewOwner());
                        petRepository.save(petInProgress);
                        System.out.println("CONGRATS COMPLETED ADOPTION" + petInProgress.getUser_id());

                } else {
                        System.out.println("todavia no esta listo" + adoptionInProcess);
                }
        }

        public List<AdoptionEntity> getAllAdoptions() {
                return (List<AdoptionEntity>) adoptionRepository.findAll();
        }




}
