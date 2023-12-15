package com.nocountry.pets.app;

import com.nocountry.pets.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication implements CommandLineRunner {

    @Autowired
    private EmailService emailService;

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }

    @Override
    public void run(String... args) {
        // Example of how to send an email
       try {
        emailService.sendEmail("123@gmail.com", "Important Update", "Dear User,\n\nThank you for using our application. We appreciate your time and commitment.\n\nBest regards,\nYour Application Team");
        System.out.println("Email sent successfully!");
       } catch (Exception e) {
          System.err.println("Error sending email: " + e.getMessage());
       }
   }
}

