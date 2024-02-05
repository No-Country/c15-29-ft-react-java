package com.nocountry.pets.imgTesting;
import com.nocountry.pets.models.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "images")
public class ImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UUID uuid;
    private String pathImage;
    private String type;
    private String name;
    private Long size;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user_id = null;
    @ManyToOne
    @JoinColumn(name = "pet_id")
    private UserEntity pet_id = null;

}

