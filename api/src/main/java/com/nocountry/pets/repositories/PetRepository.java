package com.nocountry.pets.repositories;

import com.nocountry.pets.models.Pet;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PetRepository extends CrudRepository<Pet, Long> {


    List<Pet> findAllByAdopted(Boolean adopted);
}
