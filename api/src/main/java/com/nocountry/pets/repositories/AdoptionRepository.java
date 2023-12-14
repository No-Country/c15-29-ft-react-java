package com.nocountry.pets.repositories;

import com.nocountry.pets.models.AdoptionEntity;
import com.nocountry.pets.models.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.NoSuchElementException;

public interface AdoptionRepository extends CrudRepository<AdoptionEntity,Long> {

    default AdoptionEntity getByIdOrThrow(Long id) {
        return findById(id)
                .orElseThrow(() -> new NoSuchElementException("The adoption_id searched not exist : " + id));
    }
}
