package com.nhom678.server.controllers.thymleaf;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    @GetMapping({"/authen"})
    public String login() {
        return "authen";
    }
}
