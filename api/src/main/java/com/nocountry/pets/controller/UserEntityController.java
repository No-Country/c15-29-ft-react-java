package com.nocountry.pets.controller;

import com.nocountry.pets.controller.request.CreateUserDTO;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.service.EmailService;
import com.nocountry.pets.service.UserEntityService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;

@RestController()
@RequestMapping("/api/userEntity")

//esta etiqueta es necesaria?
//@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserEntityController {


    @Autowired private UserEntityService userEntityService;

    @Autowired EmailService emailService;

    @GetMapping()
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userEntityService.getAllUsers();
        return ResponseEntity.ok(users);
    }


    @GetMapping("/{username}")
    public ResponseEntity<UserEntity> getUserByUsername(@PathVariable String username) {
        try {
            UserEntity user = userEntityService.getUserForUsername(username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUserEntity(@Valid @ModelAttribute CreateUserDTO createUserDTO){
        try {
            UserEntity newUser = userEntityService.createUserEntity(createUserDTO);
            String userEmail = newUser.getEmail();
            String userName = createUserDTO.getUsername();
            sendWelcomeEmail(userEmail, userName);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This username has already been registered (controller)");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error in user creating");
        }

    }

    private void sendWelcomeEmail(String userEmail, String userName) {
        try {
            // Get the HTML email body
            String htmlContent = getWelcomeEmailBody(userName);

            // Send the email
            emailService.sendHtmlEmail(userEmail, "Thank you for joining PawFinders", htmlContent);
            System.out.println("Welcome Email sent successfully!");
        } catch (Exception e) {
            System.err.println("Error sending Welcome Email: " + e.getMessage());
        }

    }

    private String getWelcomeEmailBody(String userName) {
        String logoImageBase64 = "data:image/png;base64," + encodeImageToBase64("static/images/paw_finders_logo(1).png");//encodeImageToBase64("static/images/paw_finders_logo(1).png");
        String footerImageBase64 = "data:image/png;base64," + encodeImageToBase64("static/images/paw_finders_footer.png");//encodeImageToBase64("static/images/paw_finders_footer.png");

        return "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Welcome to PawFinders</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: 'Arial', sans-serif;\n" +
                "            background-color: #f9f9f9;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "        }\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 30px auto;\n" +
                "            background-color: whitesmoke; \n" +
                "            color: black;\n" +
                "            padding: 20px;\n" +
                "            border-radius: 8px;\n" +
                "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                "        }\n" +
                "        .header img {\n" +
                "            width: 100%; \n" +
                "            max-width: 600px; \n" +
                "            height: auto; \n" +
                "            margin-bottom: 20px; \n" +
                "        }\n" +
                "        h1 {\n" +
                "            color: #ff6961; \n" +
                "        }\n" +
                "        p {\n" +
                "            color: black; \n" +
                "        }\n" +
                "        .footer {\n" +
                "            margin-top: 20px;\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "        .footer-content {\n" +
                "            background-color: white; \n" +
                "            color: #fff; \n" +
                "            padding: 20px;\n" +
                "            text-align: center; \n" +
                "        }\n" +
                "        .footer-content p {\n" +
                "            color: #ff7f50; \n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <div class=\"header\">\n" +
                "            <img src=\"" + logoImageBase64 + "\" alt=\"PawFinders Logo\">\n" +
                "        </div>\n" +
                "        <h1>Welcome to PawFinders!</h1>\n" +
                "        <p style=\"color: #333333;\">Dear User, <span style=\"color: #e91e63;\">" + userName + "</span></p>\n" +
                "        <p>We're excited to welcome you to PawFinder, your go-to platform for connecting with fellow pet lovers, finding adorable pets for adoption, and discovering valuable resources for your furry friends.</p>\n" +
                "        <p>Feel free to explore our community, create your profile, and start your journey with PawFinder today!</p>\n" +
                "        <div class=\"footer\">\n" +
                "            <p>Best regards,<br>The PawFinders Team</p>\n" +
                "        </div>\n" +
                "        <div class=\"footer-content\">\n" +
                "            <p>WE MAKE GOODS FOR A BETTER FUTURE</p>\n" +
                "            <p>We make a difference in the lives of our four-legged friends. We actively collaborate with shelters and rescue organizations to help needy dogs find loving permanent homes.</p>\n" +
                "            <p>If you have any questions, please email us at <a href=\"mailto:nocountryc1529@gmail.com\" style=\"color: blue;\">nocountryc1529@gmail.com</a></p>\n" +
                "            <br>\n" +
                "            <p><img src=\"" + footerImageBase64 + "\" alt=\"Copyright PawFinders\"></p>\n" +
                "            <p>&copy; 2023 | PawFinder | 934 Route 73, Great Bend, KS 52783</p>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";

    }

    private String encodeImageToBase64(String imagePath) {
        try {
            Resource resource = new ClassPathResource(imagePath);
            InputStream inputStream = resource.getInputStream();
            byte[] imageBytes = StreamUtils.copyToByteArray(inputStream);
            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (IOException e) {
            throw new RuntimeException("Error encoding image to base64", e);
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        try {
            userEntityService.deleteUserEntity(email);
            return ResponseEntity.ok("deleted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el usuario");
        }
    }

    @PutMapping("/{email}")
    public ResponseEntity<?> updateUser(@PathVariable String email, @Valid @RequestBody CreateUserDTO createUserDTO) {
        try {
            UserEntity updatedUser = userEntityService.updateUserEntity(email, createUserDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el usuario");
        }
    }



}
