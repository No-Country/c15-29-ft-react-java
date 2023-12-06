package com.nocountry.pets.repositories;

import com.nocountry.pets.models.Pet;
import org.springframework.data.repository.CrudRepository;

public interface PetRepository extends CrudRepository<Pet, Long> {

}
