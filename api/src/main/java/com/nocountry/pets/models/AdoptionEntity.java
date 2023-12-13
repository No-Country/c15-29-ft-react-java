package com.nocountry.pets.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.Date;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "adoptions")
public class AdoptionEntity {

    //this model register the adoption process.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_newOwner_id")
    private UserEntity newOwner;

    @ManyToOne
    @JoinColumn(name = "mascota_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "user_realOwner_id")
    private UserEntity realOwner;

    LocalDateTime dateStarted;
    LocalDateTime dateCompleted;

    private Boolean newOwnerConfirm = false;
    private Boolean realOwnerConfirm = false;
    private Boolean adoptionCompleted = false;

}
