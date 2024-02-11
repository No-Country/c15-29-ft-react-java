package com.nocountry.pets.imgTesting;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/image")
public class ImageController {
    @Autowired
    ImageService imageService;

    // non entity get and save
    @PostMapping()
    public ResponseEntity<ResponseMessage> saveImage(@RequestParam("file") MultipartFile file) throws IOException {
        ImageEntity imageEntity = imageService.saveImage(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseMessage("Saved succesfully  : " + imageEntity));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) throws FileNotFoundException {
        ImageEntity imageEntity = imageService.getById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseMessage("ID found" + id +  " succesfully : " + imageEntity));
    }

    @PostMapping("/user")
    public ResponseEntity<ResponseMessage> saveUserImage(@RequestParam("file") MultipartFile file) throws IOException {
        ImageEntity imageEntity = imageService.saveUserImage(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseMessage("saveUserImage succesfully  : " + imageEntity));
    }

    @GetMapping("/user")
    public ResponseEntity<ResponseMessage> getUserImage() throws FileNotFoundException {
        String url = imageService.getUserImage();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseMessage("getUserImage avatar url : " + url));
    }

    @PostMapping("/pet")
    public ResponseEntity<ResponseMessage> savePetImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("petId") Long id) throws IOException {
        ImageEntity imageEntity = imageService.savePetImage(file , id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseMessage("savePetImage succesfully  : " + imageEntity));
    }

    @GetMapping("/pet/{petId}")
    public ResponseEntity<ResponseMessage> getPetImages(@PathVariable Long petId) throws FileNotFoundException {
        System.out.println("entra");
        List<String> url = imageService.getPetImages(petId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseMessage("getPetImage avatar url : " + url));
    }






}
