package com.nocountry.pets.service;

import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    @Autowired
    UserRepository userRepository;

    public UserEntity getUserLogged(){
        String authUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("USERNAME : " + authUsername );
        UserEntity userLogged = userRepository.findByUsername(authUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return userLogged;
    }
}
