package com.nhom678.server;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		String dotenvPath = System.getenv("DOTENV_PATH");
		Dotenv dotenv = Dotenv.configure().directory(dotenvPath).load();
		SpringApplication.run(ServerApplication.class, args);
	}

}
