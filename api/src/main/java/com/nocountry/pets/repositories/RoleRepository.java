package com.nocountry.pets.repositories;

import com.nocountry.pets.models.ERole;
import com.nocountry.pets.models.RoleEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(ERole eRole);
}
