package com.nocountry.pets.service;


import com.nocountry.pets.controller.request.CreateUserDTO;
import com.nocountry.pets.models.ERole;
import com.nocountry.pets.models.RoleEntity;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.RoleRepository;
import com.nocountry.pets.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserEntityService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;


    //"transactional" causes all tasks in the function to be completed or none to be done
    @Transactional
    public UserEntity createUserEntity(CreateUserDTO createUserDTO) {

        String email = createUserDTO.getEmail();

        if (userRepository.existsByUsername(email)) {
            throw new IllegalArgumentException("This username has already been registered");
        }

        Set<RoleEntity> roles = createUserDTO.getRoles().stream()
                .map(roleName -> roleRepository.findByName(ERole.valueOf(roleName))
                        .orElseGet(() -> RoleEntity.builder().name(ERole.valueOf(roleName)).build()))
                .collect(Collectors.toSet());


        //set a new user from createUserDTO
        UserEntity userEntity = UserEntity.builder()
                .username(createUserDTO.getUsername())
                .password(passwordEncoder.encode(createUserDTO.getPassword()))
                .email(createUserDTO.getEmail())
                .roles(roles)
                .name(createUserDTO.getName())
                .lastName(createUserDTO.getLastName())
                .dateOfBirth(createUserDTO.getDateOfBirth())
                .avatar(createUserDTO.getAvatar())
                .status(createUserDTO.getStatus())
                .nationality(createUserDTO.getNationality())
                .address(createUserDTO.getAddress())
                .build();

        userRepository.save(userEntity);

        return userEntity;
    }

    @Transactional
    public void deleteUserEntity(String email) {
        UserEntity user = userRepository.findByUsername(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        userRepository.delete(user);
    }

    @Transactional
    public UserEntity updateUserEntity(String email, CreateUserDTO createUserDTO) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("user not founded"));

        return userRepository.save(user);
    }

    public List<UserEntity> getAllUsers() {
        return (List<UserEntity>) userRepository.findAll();
    }

    public UserEntity getUserForUsername(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("user not founded"));
    }

}
