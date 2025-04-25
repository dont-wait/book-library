package com.nhom678.server;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		//Dotenv dotenv = Dotenv.load();
		Dotenv dotenv = Dotenv.configure().directory("/home/dontwait/programming/_huit-library/server").load();
		System.out.println(dotenv.get("DB_URL"));
		SpringApplication.run(ServerApplication.class, args);
	}

}
