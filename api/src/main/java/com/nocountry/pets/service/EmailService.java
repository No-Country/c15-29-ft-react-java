package com.nocountry.pets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;


@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    public void sendEmail(String toEmail, String emailSubject, String emailBody) {
        try {
            MimeMessagePreparator messagePreparator = mimeMessage -> {
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
                helper.setTo(toEmail);
                helper.setSubject(emailSubject);
                helper.setText(emailBody, true);
            };

            javaMailSender.send(messagePreparator);
        } catch (Exception e) {
            // Handle the exception or log it
            System.err.println("Error sending email: " + e.getMessage());
        }
    }

//    public void sendEmail(String toEmail, String emailSubject, String emailBody) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(toEmail);
//        message.setSubject(emailSubject);
//        message.setText(emailBody);
//
//        javaMailSender.send(message);
//    }

}
