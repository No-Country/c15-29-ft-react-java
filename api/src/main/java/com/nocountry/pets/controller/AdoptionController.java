package com.nocountry.pets.controller;


import com.nocountry.pets.controller.request.AdoptionDTO;
import com.nocountry.pets.models.AdoptionEntity;
import com.nocountry.pets.service.AdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/adoption")
public class AdoptionController {

    @Autowired
    AdoptionService adoptionService;

    @PostMapping()
    public ResponseEntity<AdoptionEntity> newAdoption(@RequestBody AdoptionDTO adoption) {

        System.out.println(adoption.toString());

        return ResponseEntity.ok(adoptionService.newAdoption(adoption.getId_realOwner(),
                adoption.getId_newOwner(),
                adoption.getId_pet()));
    }


    @PutMapping("/confirm/{id_userConfirm}/{id_adoption}")
    public void confirmAdoption(
            @PathVariable Long id_userConfirm,
            @PathVariable Long id_adoption
    ) {
        adoptionService.confirmAdoption(id_userConfirm, id_adoption);
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<AdoptionEntity>> getAllAdoptions() {
        List<AdoptionEntity> adoptions = adoptionService.getAllAdoptions();
        return ResponseEntity.ok(adoptions);
    }


}
