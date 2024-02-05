package com.nocountry.pets.imgTesting;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@RequestMapping("/api/testLocalImage")
public class ImageController {
    @Autowired
    ImageService imageService;


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


}
