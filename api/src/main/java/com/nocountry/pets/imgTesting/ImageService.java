package com.nocountry.pets.imgTesting;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.NoSuchElementException;

public interface ImageService {

    ImageEntity saveImage (MultipartFile file) throws IOException;
    ImageEntity getById(Long id) throws NoSuchElementException;
    ImageEntity saveUserImage (MultipartFile file) throws IOException;
    String getUserImage() throws NoSuchElementException;
    ImageEntity savePetImage (MultipartFile file, Long petId) throws IOException;
    List<String> getPetImages(Long petId) throws NoSuchElementException;


}
