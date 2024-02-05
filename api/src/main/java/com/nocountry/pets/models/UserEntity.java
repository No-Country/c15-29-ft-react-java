package com.nocountry.pets.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nocountry.pets.imgTesting.ImageEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER, targetEntity = RoleEntity.class, cascade = CascadeType.PERSIST)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleEntity> roles;

    @JsonIgnore
    @OneToMany(mappedBy = "user_id", cascade = CascadeType.ALL)
    private List<Pet> pets;

    @JsonIgnore
    @OneToMany(mappedBy = "user_id", cascade = CascadeType.ALL)
    private List<ImageEntity> images;

    @Email
    @NotBlank
    @Column(unique = true)
    @Size(min = 10, max = 30, message = "Email must be between 10 and 30 characters.")
    private String email;
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
    private String avatar;
    @Size(min = 10 , max = 20, message = "WhatsApp number cannot exceed 20 characters.")
    private String whatsappNumber;

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", nationality='" + nationality + '\'' +
                ", address='" + address + '\'' +
                ", avatar='" + avatar + '\'' +
                ", avatar='" + whatsappNumber + '\'' +
                '}';
    }


}
