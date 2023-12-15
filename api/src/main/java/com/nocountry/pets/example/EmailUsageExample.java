package com.nocountry.pets.example;

import com.nocountry.pets.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmailUsageExample {

    @Autowired
    private EmailService emailService;

    public void sendSampleEmail() {
        String toEmail = "nocountryc1529@gmail.com";
        String emailSubject = "Important Update";
        String emailBody = "Dear User,\n\nThank you for using our application. We appreciate your time and commitment.\n\nBest regards,\nYour Application Team";


        emailService.sendEmail(toEmail, emailSubject, emailBody);
    }
}
