package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.response.CategoryResponse;
import com.nhom678.server.services.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/categories")
public class CategoryController {

    CategoryService categoryService;
    @GetMapping
    ApiResponse<List<CategoryResponse>> getAllCategory() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .result(categoryService.getAllCategory())
                .message("Success")
                .build();
    }
    @GetMapping("/{categoryName}")
    ApiResponse<CategoryResponse> getCategoryByCategoryName(@PathVariable String categoryName) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.getCategoryByName(categoryName))
                .message("Success")
                .build();
    }

}
