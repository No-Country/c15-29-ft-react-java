package com.nocountry.pets.repositories;

import com.nocountry.pets.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
 public interface UserPasswordRepository extends JpaRepository<UserEntity, Integer> {
     Optional<UserEntity> findByEmail(String email);
 }


