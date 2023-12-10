package com.nocountry.pets.repositories;

import com.nocountry.pets.models.AdoptionEntity;
import org.springframework.data.repository.CrudRepository;

public interface AdoptionRepository extends CrudRepository<AdoptionEntity,Long> {
}
