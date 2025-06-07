package com.nhom678.server.controller;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.entity.StatusBook;
import com.nhom678.server.repositories.StatusBookRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("status/status-books")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatusBookController {
    StatusBookRepository statusBookRepository;

    @GetMapping
    ApiResponse<List<StatusBook>> getAllStatusBook() {
        return ApiResponse.<List<StatusBook>>builder()
                .result(statusBookRepository.findAll())
                .message("Get all status book Success")
                .build();
    }
}
