package com.nocountry.pets.repositories;

import com.nocountry.pets.models.Pet;
import com.nocountry.pets.models.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.NoSuchElementException;

public interface PetRepository extends CrudRepository<Pet, Long> {


    List<Pet> findAllByAdopted(Boolean adopted);


    default Pet getByIdOrThrow(Long id) {
        return findById(id)
                .orElseThrow(() -> new NoSuchElementException("The id searched not exist : " + id));
    }

    @Query("SELECT p FROM Pet p JOIN FETCH p.user_id u WHERE u.id = :userId")
    List<Pet> findAllPetsByUserId(@Param("userId") Long id);


}
