package com.nocountry.pets.imgTesting;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;


import java.util.NoSuchElementException;

public interface ImageService {

    ImageEntity saveImage (MultipartFile file) throws IOException;
    ImageEntity getById(Long id) throws NoSuchElementException;



}
