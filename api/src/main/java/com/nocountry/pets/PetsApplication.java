package com.nocountry.pets;

import com.nocountry.pets.models.ERole;
import com.nocountry.pets.models.RoleEntity;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.RoleRepository;
import com.nocountry.pets.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Set;

@SpringBootApplication

public class PetsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetsApplication.class, args);
	}



	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;


	/*If roles not exists , roles and defaults users will be generated */
	@Bean
	CommandLineRunner init(){

		ArrayList<RoleEntity> roles = (ArrayList<RoleEntity>) roleRepository.findAll();
		if(roles.isEmpty()){

			return args -> {

				UserEntity userEntity = UserEntity.builder()
						.email("santiago@mail.com")
						.username("santiago")
						.password(passwordEncoder.encode("1234"))
						.roles(Set.of(RoleEntity.builder()
								.name(ERole.valueOf(ERole.ADMIN.name()))
								.build()))
						.build();

				UserEntity userEntity2 = UserEntity.builder()
						.email("anyi@mail.com")
						.username("anyi")
						.password(passwordEncoder.encode("1234"))
						.roles(Set.of(RoleEntity.builder()
								.name(ERole.valueOf(ERole.USER.name()))
								.build()))
						.build();

				UserEntity userEntity3 = UserEntity.builder()
						.email("andrea@mail.com")
						.username("andrea")
						.password(passwordEncoder.encode("1234"))
						.roles(Set.of(RoleEntity.builder()
								.name(ERole.valueOf(ERole.INVITED.name()))
								.build()))
						.build();

				userRepository.save(userEntity);
				userRepository.save(userEntity2);
				userRepository.save(userEntity3);
			};
		}else
		{return  null;}

	}

}
