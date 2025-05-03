package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.category.CreateCategoryRequest;
import com.nhom678.server.dto.response.CategoryResponse;
import com.nhom678.server.services.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping
    ApiResponse<CategoryResponse> createCategory(@RequestBody CreateCategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.createCategory(request))
                .message("Success").build();
    }

}
