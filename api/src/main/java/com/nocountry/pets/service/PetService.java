package com.nocountry.pets.service;


import com.nocountry.pets.models.Pet;
import com.nocountry.pets.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetService {

    @Autowired
    PetRepository petRepository;
    @Autowired
    Pet pet;


}
