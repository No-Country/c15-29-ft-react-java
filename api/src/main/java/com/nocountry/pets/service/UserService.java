package com.nocountry.pets.service;


import com.nocountry.pets.model.User;
import com.nocountry.pets.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User deleteUser(Long userId) {
        User userToDelete = userRepository.findById(userId).orElseThrow(null);
        userRepository.delete(userToDelete);
        return userToDelete;
    }

    public User updateUser(User user) {
        // Verificar si el usuario ya existe en la base de datos
        Long userId = user.getId();
        if (userId != null && userRepository.existsById(userId)) {
            // Si existe, se realiza la actualización
            return userRepository.save(user);
        } else {
            // Si no existe, puedes manejar el caso de error o lanzar una excepción
            throw new EntityNotFoundException("El usuario con ID " + userId + " no existe.");
        }
    }
}
