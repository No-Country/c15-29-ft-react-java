package com.nocountry.pets.controller;

import com.nocountry.pets.service.IS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class S3Controller {

    @Autowired
    private IS3Service is3Service;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file")MultipartFile file) throws IOException {
//        return is3Service.uploadFile(file);
        return "";
    }

    @GetMapping("/image/{key}")
    @CrossOrigin(origins = "http://localhost:3000")
    public byte[] getObject(@PathVariable String key){
        return is3Service.getObject("nocountry-pawfinder", key);
    }
}
