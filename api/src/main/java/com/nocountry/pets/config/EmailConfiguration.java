package com.nocountry.pets.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailConfiguration {
    @Value("${spring.mail.host}")
    private String mailHost;
    @Value("${spring.mail.port:587}")
    private Integer mailPort;
    @Value("${spring.mail.username}")
    private String mailUsername;
    @Value("${spring.mail.password}")
    private String mailPassword;

    @Bean
    public JavaMailSender JavaMailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(mailHost); //javaMailSender.setHost(mailHost);
        javaMailSender.setPort(mailPort); //javaMailSender.setPort(Integer.parseInt(mailPort));
        javaMailSender.setUsername(mailUsername); //javaMailSender.setUsername(mailUsername);
        javaMailSender.setPassword(mailPassword); //javaMailSender.setPassword(mailPassword);

        Properties props = javaMailSender.getJavaMailProperties();
        props.put("mail.smtp.starttls.enable", "true");
        return javaMailSender;
    }
}