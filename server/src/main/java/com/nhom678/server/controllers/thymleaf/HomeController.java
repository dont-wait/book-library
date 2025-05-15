package com.nhom678.server.controllers.thymleaf;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping({"/", "/home"})
    public String home() {
        return "home";   // Thymeleaf sẽ render src/main/resources/templates/home.html
    }
}
