package com.nocountry.pets.controller;

import com.nocountry.pets.controller.request.CreateUserDTO;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.service.UserEntityService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/userEntity")

//esta etiqueta es necesaria?
//@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserEntityController {


    @Autowired private UserEntityService userEntityService;

    @GetMapping()
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userEntityService.getAllUsers();
        return ResponseEntity.ok(users);
    }


    @GetMapping("/{username}")
    public ResponseEntity<UserEntity> getUserByUsername(@PathVariable String username) {
        try {
            UserEntity user = userEntityService.getUserForUsername(username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUserEntity(@Valid @ModelAttribute CreateUserDTO createUserDTO){
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

    @PutMapping("")
    public ResponseEntity<?> updateUser(@Valid @ModelAttribute CreateUserDTO createUserDTO) {
        try {
            UserEntity updatedUser = userEntityService.updateUserEntity(createUserDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el usuario");
        }
    }



}
