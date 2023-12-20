package com.nocountry.pets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;


@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendHtmlEmail(String toEmail, String emailSubject, String emailBody) {
        try {
            MimeMessagePreparator messagePreparator = mimeMessage -> {
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
                helper.setTo(toEmail);
                helper.setSubject(emailSubject);
                helper.setText(emailBody, true);
                helper.setFrom("nocountryc1529@gmail.com", "PawFinders\uD83D\uDC3E");
            };

            javaMailSender.send(messagePreparator);
        } catch (Exception e) {
            // Handle the exception or log it
            System.err.println("Error sending email: " + e.getMessage());
        }


    }

}