package com.nocountry.pets.repositories;

import com.nocountry.pets.models.Pet;
import com.nocountry.pets.models.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.NoSuchElementException;

public interface PetRepository extends CrudRepository<Pet, Long> {


    List<Pet> findAllByAdopted(Boolean adopted);


    default Pet getByIdOrThrow(Long id) {
        return findById(id)
                .orElseThrow(() -> new NoSuchElementException("The id searched not exist : " + id));
    }

//    List<Pet> findByUserId(Long userId);


}
