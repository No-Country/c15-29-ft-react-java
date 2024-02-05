package com.nocountry.pets.imgTesting;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageDTO {

    private Long id;
    MultipartFile imageInMultipart;
    //para guardar en local.
    String pathImage;
    String name;
    private String type;
    private long data;
}
