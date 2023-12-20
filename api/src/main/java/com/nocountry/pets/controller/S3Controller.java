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


    @GetMapping("/getimage")
    @CrossOrigin(origins = "http://localhost:3000")
    public byte[] getObject(@RequestParam String entityId, @RequestParam String idImg){
        return is3Service.getObject("nocountry-pawfinder", String.format("%s/images/%s",entityId,idImg));
    }

    @GetMapping("/deleteimages")
    public void deleteObjects(@RequestParam String rootId){
        is3Service.deleteMultiplesFiles(rootId);
    }
}
