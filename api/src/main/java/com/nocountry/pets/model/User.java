package com.nocountry.pets.model;


import jakarta.persistence.*;
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
    private String lastName;
    private Date dateOfBirth;
    private String nationality;
    private String status;
    private String password;
    private String address;
    private String avatar;

}
