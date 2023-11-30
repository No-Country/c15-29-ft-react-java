package com.nocountry.pets.model;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String lastName;
    private Date dateOfBirth;
    private String nationality;
    private String status;
    private String password;
    private String address;
    private String avatar;

}


