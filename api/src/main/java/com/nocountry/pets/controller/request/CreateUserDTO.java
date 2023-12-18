package com.nocountry.pets.controller.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDTO implements Serializable {

    @Email
    @NotBlank
    @Column(unique = true)
    @Size(min = 10, max = 30, message = "Email must be between 10 and 30 characters.")
    private String email;

    private Set<String> roles;

    @NotBlank
    @Size(min = 2, max = 20, message = "Username must be between 2 and 20 characters.")
    private String username;
    @NotBlank
    @Size(min = 3, max = 20, message = "Password must be between 3 and 20 characters.")
    private String password;
    @Size(min = 2, max = 20, message = "Name cannot exceed 2 and 20 characters.")
    private String name;
    @Size(max = 20, message = "Last name cannot exceed 20 characters.")
    private String lastName;
    private Date dateOfBirth;
    @Size(max = 20)
    private String nationality;
    @Size(max = 20, message = "Address cannot exceed 20 characters.")
    private String address;
    private MultipartFile avatar;
    @Size(min = 10 , max = 20, message = "WhatsApp number cannot exceed 20 characters.")
    private String whatsappNumber;
}
