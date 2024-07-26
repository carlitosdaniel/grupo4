package com.ejemplo.examenes.mscv_examenes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients
@EnableJpaRepositories(basePackages = "com.ejemplo.examenes.mscv_examenes.repositories")

public class MscvExamenesApplication {

	public static void main(String[] args) {
		SpringApplication.run(MscvExamenesApplication.class, args);
	}
}
