package com.nocountry.pets.service;


import com.nocountry.pets.controller.request.CreateUserDTO;
import com.nocountry.pets.models.ERole;
import com.nocountry.pets.models.RoleEntity;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.RoleRepository;
import com.nocountry.pets.repositories.UserRepository;
import com.nocountry.pets.service.impl.S3ServiceImpl;
import com.nocountry.pets.utils.ResizeImage;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
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
    @Autowired
    private SessionService sessionService;
    @Autowired
    private S3ServiceImpl s3Service;


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

        String username = createUserDTO.getUsername();

        String avatarLink = String.format("nocountry-pawfinder/%s/image/%s", username, "thumbnail");

        //set a new user from createUserDTO
        UserEntity userEntity = UserEntity.builder()
                .username(createUserDTO.getUsername())
                .password(passwordEncoder.encode(createUserDTO.getPassword()))
                .email(createUserDTO.getEmail())
                .roles(roles)
                .name(createUserDTO.getName())
                .lastName(createUserDTO.getLastName())
                .dateOfBirth(createUserDTO.getDateOfBirth())
                .avatar(avatarLink)
                .nationality(createUserDTO.getNationality())
                .address(createUserDTO.getAddress())
                .build();

        uploadAvatar(createUserDTO.getAvatar(), createUserDTO.getUsername());
        userRepository.save(userEntity);
        return userEntity;
    }

    public void uploadAvatar(MultipartFile multipartFile, String userName){
        byte[] resizedImage = new byte[0];
        try{
            BufferedImage img = ImageIO.read(multipartFile.getInputStream());
            resizedImage = ResizeImage.thumbnailAvatar(img);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try{
            s3Service.uploadFile(resizedImage, String.format("%s/image/%s", userName, "thumbnail"));
            s3Service.uploadFile(multipartFile.getBytes(),String.format("%s/image/original",userName));
        }catch (IOException exception) {
            throw new RuntimeException("Error subiendo avatar");
        }
    }

    @Transactional
    public void deleteUserEntity(String email) {
        UserEntity user = userRepository.findByUsername(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        userRepository.delete(user);
    }

    @Transactional
    public UserEntity updateUserEntity(CreateUserDTO createUserDTO) {
        UserEntity userEntity = sessionService.getUserLogged();

        //update only properties that is not null

        if (createUserDTO.getEmail() != null) {
            userEntity.setEmail(createUserDTO.getEmail());
        }

        if (createUserDTO.getPassword() != null) {
            userEntity.setPassword(createUserDTO.getPassword());
        }

        if (createUserDTO.getName() != null) {
            userEntity.setName(createUserDTO.getName());
        }

        if (createUserDTO.getLastName() != null) {
            userEntity.setLastName(createUserDTO.getLastName());
        }

        if (createUserDTO.getDateOfBirth() != null) {
            userEntity.setDateOfBirth(createUserDTO.getDateOfBirth());
        }

        if (createUserDTO.getNationality() != null) {
            userEntity.setNationality(createUserDTO.getNationality());
        }

        if (createUserDTO.getAddress() != null) {
            userEntity.setAddress(createUserDTO.getAddress());
        }

        if (createUserDTO.getAvatar() != null) {
            String avatarLink = String.format("nocountry-pawfinder/%s/image/%s", userEntity.getUsername(), "thumbnail");
            uploadAvatar(createUserDTO.getAvatar(), createUserDTO.getUsername());
            userEntity.setAvatar(avatarLink);
        }

        if (createUserDTO.getWhatsappNumber() != null) {
            userEntity.setWhatsappNumber(createUserDTO.getWhatsappNumber());
        }

        return userRepository.save(userEntity);
    }

    public List<UserEntity> getAllUsers() {
        return (List<UserEntity>) userRepository.findAll();
    }

    public UserEntity getUserForUsername(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("user not founded"));
    }

}
