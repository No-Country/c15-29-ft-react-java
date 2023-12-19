package com.nocountry.pets.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IS3Service {

    boolean uploadFile(byte[] image, String key) throws IOException;
    byte[] getObject(String bucketName, String key);
    void deleteObject(String bucketName, String key);
    void deleteMultiplesFiles(String entityRoot);
}
