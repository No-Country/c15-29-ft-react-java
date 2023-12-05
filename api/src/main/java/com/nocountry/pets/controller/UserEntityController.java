package com.nocountry.pets.controller;

import com.nocountry.pets.controller.request.CreateUserDTO;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.service.UserEntityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/userEntity")
public class UserEntityController {


    @Autowired UserEntityService userEntityService;

    @GetMapping()
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userEntityService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping()
    public ResponseEntity<?> createUserEntity(@Valid @RequestBody CreateUserDTO createUserDTO){

        try {
            UserEntity newUser = userEntityService.createUserEntity(createUserDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This username has already been registered (controller)");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error in user creating");
        }

    }

    @DeleteMapping("/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        try {
            userEntityService.deleteUserEntity(email);
            return ResponseEntity.ok("deleted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el usuario");
        }
    }

    @PutMapping("/{email}")
    public ResponseEntity<?> updateUser(@PathVariable String email, @Valid @RequestBody CreateUserDTO createUserDTO) {
        try {
            UserEntity updatedUser = userEntityService.updateUserEntity(email, createUserDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el usuario");
        }
    }



}
