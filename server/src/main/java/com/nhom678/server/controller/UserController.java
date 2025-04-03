package com.nhom678.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1")
public class UserController {

    @GetMapping
    public ResponseEntity<String> PrintHello() {
        return ResponseEntity.ok("Hello world");
    }
}
