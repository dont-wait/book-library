package com.nhom678.server;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().directory("/home/dontwait/programming/_huit-library/server").load();
		SpringApplication.run(ServerApplication.class, args);
	}

}
